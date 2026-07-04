import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { sendEmail, welcomeHtml } from '@/app/lib/function';

export async function POST(request) {
  let client;
  try {
    const { name, email, password, avatar = '', provider = 'manual' } = await request.json();
    
    client = await pool.connect();
    
    // Parameterized inserts to prevent SQL injection
    const userResult = await client.query(`
      INSERT INTO auth.users(id, name, email, password, avatar, provider)
      VALUES(gen_random_uuid(), $1, $2, $3, $4, $5)
      RETURNING *
    `, [name, email, password, avatar, provider]);
    
    const user = userResult.rows[0];
    
    await client.query(`
      INSERT INTO auth.providers(id)
      VALUES($1)
    `, [user.id]);
    
    // Optional: send welcome email (matching backend onboarding flow)
    try {
      if (email) {
        await sendEmail(email, 'Welcome to J.A.R.V.I.S', welcomeHtml(user));
      }
    } catch (emailErr) {
      console.error("Failed to send signup onboarding email:", emailErr.message);
    }
    
    return NextResponse.json({ success: true, message: `Registration is successful for ${user.name}` });
  } catch (err) {
    console.error("Signup API route error:", err);
    return new NextResponse('Registration failed. The email may already be in use.', { status: 500 });
  } finally {
    if (client) {
      client.release();
    }
  }
}
