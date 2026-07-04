import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import pool from '@/app/lib/db';
import { facebook_auth, sendEmail, welcomeHtml } from '@/app/lib/function';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const base = process.env.BASE_URI || new URL(request.url).origin;

  if (!code) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  let dbClient;
  try {
    const redirectUri = `${base}/auth/facebook/callback`;
    const user = await facebook_auth(code, redirectUri);

    dbClient = await pool.connect();
    
    // Check mapping using raw SQL with dynamic case resilience
    let mappingRes;
    try {
      mappingRes = await dbClient.query(`
        SELECT u.* FROM public.users_profile u
        JOIN public.id i ON u.id = i.id
        WHERE i."Facebook" = $1
      `, [user.id]);
    } catch (err) {
      mappingRes = await dbClient.query(`
        SELECT u.* FROM public.users_profile u
        JOIN public.id i ON u.id = i.id
        WHERE i.facebook = $1
      `, [user.id]);
    }

    let sbuser = mappingRes.rows[0];

    if (!sbuser) {
      const newProfileRes = await dbClient.query(`
        INSERT INTO public.users_profile (id, name, email, verfied_email, profile_pic, provider)
        VALUES (gen_random_uuid(), $1, $2, 1, $3, 'facebook')
        RETURNING *
      `, [user.name, user.email || '', user.picture?.data?.url || '']);

      sbuser = newProfileRes.rows[0];

      // Insert link in id mapping table with casing resilience
      try {
        await dbClient.query('INSERT INTO public.id (id, "Facebook") VALUES ($1, $2)', [sbuser.id, user.id]);
      } catch (err) {
        await dbClient.query('INSERT INTO public.id (id, facebook) VALUES ($1, $2)', [sbuser.id, user.id]);
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
    console.error("Facebook Auth callback route error:", err);
    return NextResponse.redirect(new URL('/auth/login?error=facebook_failed', request.url));
  } finally {
    if (dbClient) {
      dbClient.release();
    }
  }
}
