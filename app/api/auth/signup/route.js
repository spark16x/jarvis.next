import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import pool from '@/app/lib/db.js';
import { cookies } from 'next/headers';


export async function POST(request) {
  let client = await pool.connect();
  const body = await headers();
  let cookie = await cookies();
  
  let name = body.get('name')
  let email = body.get('email')
  let password = body.get('password')
  let provider = body.get('provider')
  let avatar = body.get('avatar')
  
  
  let user = await pool.query(`
 INSERT INTO auth.users(id, name, email, password, avatar,provider)
VALUES(gen_random_uuid(), '${name}', '${email}', '${password}', '${avatar}','${provider}')
RETURNING *`
    
  )
  user = user.rows[0];
  cookie.set("token", user, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
  return Response.json({ message: `registration is sussfull of the ${user.name}` })
}