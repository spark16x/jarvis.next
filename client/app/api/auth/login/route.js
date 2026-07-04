import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // Parameterized query for SQL injection protection
    const result = await pool.query(
      'SELECT * FROM auth.users WHERE email=$1 AND password=$2',
      [email, password]
    );
    
    const user = result.rows[0];
    if (!user) {
      return new NextResponse('Invalid email or password', { status: 401 });
    }

    const token = jwt.sign(user, process.env.SUPABASE_KEY, { expiresIn: '720h' });
    
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    });
    
    return NextResponse.json({ success: true, message: 'login is successful' });
  } catch (err) {
    console.error("Login API route error:", err);
    return new NextResponse('Server encountered an error during login.', { status: 500 });
  }
}
