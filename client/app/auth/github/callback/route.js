import { NextResponse } from 'next/server';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import pool from '@/app/lib/db';
import { sendEmail, welcomeHtml } from '@/app/lib/function';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const base = process.env.BASE_URI || new URL(request.url).origin;

  if (!code) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  let dbClient;
  try {
    const redirectUri = `${base}/auth/github/callback`;
    const tokenUrl = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&redirect_uri=${redirectUri}&code=${code}`;

    const tokenResponse = await axios.post(tokenUrl, {}, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const tokenData = tokenResponse.data;
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      console.error("No access token returned from GitHub:", tokenData);
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: 'Bearer ' + accessToken }
    });
    const githubUser = userResponse.data;

    dbClient = await pool.connect();
    
    // Check mapping using raw SQL with dynamic case resilience
    let mappingRes;
    try {
      mappingRes = await dbClient.query(`
        SELECT u.* FROM public.users_profile u
        JOIN public.id i ON u.id = i.id
        WHERE i."Github" = $1
      `, [githubUser.id]);
    } catch (err) {
      mappingRes = await dbClient.query(`
        SELECT u.* FROM public.users_profile u
        JOIN public.id i ON u.id = i.id
        WHERE i.github = $1
      `, [githubUser.id]);
    }

    let sbuser = mappingRes.rows[0];

    if (!sbuser) {
      // Create user profile in Neon Postgres
      const newProfileRes = await dbClient.query(`
        INSERT INTO public.users_profile (id, name, email, verfied_email, profile_pic, provider)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, 'github')
        RETURNING *
      `, [githubUser.name || githubUser.login, githubUser.email || '', 1, githubUser.avatar_url || '', 'github']);

      sbuser = newProfileRes.rows[0];

      // Insert link in id mapping table with casing resilience
      try {
        await dbClient.query('INSERT INTO public.id (id, "Github") VALUES ($1, $2)', [sbuser.id, githubUser.id]);
      } catch (err) {
        await dbClient.query('INSERT INTO public.id (id, github) VALUES ($1, $2)', [sbuser.id, githubUser.id]);
      }

      // Send welcome onboarding email
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
    console.error("GitHub Auth callback route error:", err);
    return NextResponse.redirect(new URL('/auth/login?error=github_failed', request.url));
  } finally {
    if (dbClient) {
      dbClient.release();
    }
  }
}
