import { NextResponse } from 'next/server';
import oauth2Client from '@/app/lib/google_client';
import { google } from 'googleapis';
import pool from '@/app/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { sendEmail, welcomeHtml } from '@/app/lib/function';

export async function POST(request) {
  let dbClient;
  try {
    const { code } = await request.json();
    
    const redirectUri = process.env.BASE_URI 
      ? `${process.env.BASE_URI}/auth/google/callback` 
      : 'https://jarvisnext.vercel.app/auth/google/callback';

    const { tokens } = await oauth2Client.getToken({
      code,
      redirect_uri: redirectUri
    });
    
    oauth2Client.setCredentials(tokens);
    
    const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
    const userResponse = await oauth2.userinfo.get();
    const userInfo = userResponse.data;

    dbClient = await pool.connect();
    
    // Check if provider exists
    const providerRes = await dbClient.query('SELECT * FROM auth.providers WHERE google=$1', [userInfo.id]);
    let user = null;
    
    if (providerRes.rows.length > 0) {
      const userRes = await dbClient.query('SELECT * FROM auth.users WHERE id=$1', [providerRes.rows[0].id]);
      user = userRes.rows[0];
    }
    
    if (!user) {
      // Create user manually
      const newUserRes = await dbClient.query(`
        INSERT INTO auth.users(id, name, email, password, avatar, provider)
        VALUES(gen_random_uuid(), $1, $2, $3, $4, 'google')
        RETURNING *
      `, [userInfo.name, userInfo.email, '  ', userInfo.picture]);
      user = newUserRes.rows[0];
      
      await dbClient.query(`
        INSERT INTO auth.providers(id, google)
        VALUES($1, $2)
      `, [user.id, userInfo.id]);
      
      try {
        await sendEmail(userInfo.email, 'Welcome to J.A.R.V.I.S', welcomeHtml(user));
      } catch (emailErr) {
        console.error("Failed to send OAuth welcome email:", emailErr.message);
      }
    }

    if (tokens) {
      await dbClient.query(`
        UPDATE auth.users
        SET google_token = $1
        WHERE id = $2
      `, [JSON.stringify(tokens), user.id]);
      user.google_token = JSON.stringify(tokens);
    }
    
    const token = jwt.sign(user, process.env.SUPABASE_KEY, { expiresIn: '720h' });
    
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
    
    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("Google Auth callback error:", err);
    return new NextResponse("Google Authentication failed.", { status: 500 });
  } finally {
    if (dbClient) {
      dbClient.release();
    }
  }
}
