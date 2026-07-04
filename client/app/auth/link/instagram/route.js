import { NextResponse } from 'next/server';
import { getAuthUser } from '@/app/lib/auth';
import pool from '@/app/lib/db';
import { ig_auth } from '@/app/lib/function';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const base = process.env.BASE_URI || new URL(request.url).origin;

  const authUser = await getAuthUser();
  if (!authUser) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (!code) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  try {
    const redirectUri = `${base}/auth/link/instagram`;
    const igUser = await ig_auth(code, redirectUri);
    
    // Update mapping in Neon PostgreSQL
    await pool.query('UPDATE public.id SET "Instagram" = $1 WHERE id = $2', [igUser.id, authUser.id]);

    return NextResponse.redirect(new URL('/chat', request.url));
  } catch (err) {
    console.error("Link Instagram OAuth error:", err);
    return NextResponse.redirect(new URL('/chat?error=link_instagram_failed', request.url));
  }
}
