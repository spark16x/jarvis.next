import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import pool from '@/app/lib/db';
import { ig_auth, sendEmail, welcomeHtml } from '@/app/lib/function';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const email = searchParams.get('email');
  const base = process.env.BASE_URI || new URL(request.url).origin;

  if (!code) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If email is missing, redirect the user to a clean, client-side email-prompt page
  if (!email) {
    const getEmailUrl = new URL('/auth/instagram/get-email', request.url);
    getEmailUrl.searchParams.set('code', code);
    return NextResponse.redirect(getEmailUrl);
  }

  let dbClient;
  try {
    const redirectUri = `${base}/auth/instagram/callback`;
    const user = await ig_auth(code, redirectUri);

    dbClient = await pool.connect();
    
    // Check mapping using raw SQL with dynamic case resilience
    let mappingRes;
    try {
      mappingRes = await dbClient.query(`
        SELECT u.* FROM public.users_profile u
        JOIN public.id i ON u.id = i.id
        WHERE i."Instagram" = $1 OR i."Instagarm" = $1
      `, [user.id]);
    } catch (err) {
      mappingRes = await dbClient.query(`
        SELECT u.* FROM public.users_profile u
        JOIN public.id i ON u.id = i.id
        WHERE i.instagram = $1 OR i.instagarm = $1
      `, [user.id]);
    }

    let sbuser = mappingRes.rows[0];

    if (!sbuser) {
      const newProfileRes = await dbClient.query(`
        INSERT INTO public.users_profile (id, name, email, verfied_email, profile_pic, provider)
        VALUES (gen_random_uuid(), $1, $2, 0, $3, 'instagram')
        RETURNING *
      `, [user.username || user.name || 'Instagram User', email, user.profile_picture_url || '']);

      sbuser = newProfileRes.rows[0];

      // Insert link in id mapping table with casing resilience
      try {
        await dbClient.query('INSERT INTO public.id (id, "Instagram") VALUES ($1, $2)', [sbuser.id, user.id]);
      } catch (err) {
        try {
          await dbClient.query('INSERT INTO public.id (id, instagram) VALUES ($1, $2)', [sbuser.id, user.id]);
        } catch (err2) {
          try {
            await dbClient.query('INSERT INTO public.id (id, "Instagarm") VALUES ($1, $2)', [sbuser.id, user.id]);
          } catch (err3) {
            await dbClient.query('INSERT INTO public.id (id, instagarm) VALUES ($1, $2)', [sbuser.id, user.id]);
          }
        }
      }

      if (sbuser.email) {
        try {
          await sendEmail(sbuser.email, 'Welcome to J.A.R.V.I.S', welcomeHtml(sbuser));
        } catch (emailErr) {
          console.error("Failed to send onboarding email:", emailErr.message);
        }
      }
    }

    const token = jwt.sign(sbuser, process.env.SUPABASE_KEY, { expiresIn: '720h' });
    
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return NextResponse.redirect(new URL('/chat', request.url));
  } catch (err) {
    console.error("Instagram Auth callback route error:", err);
    return NextResponse.redirect(new URL('/auth/login?error=instagram_failed', request.url));
  } finally {
    if (dbClient) {
      dbClient.release();
    }
  }
}
