import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import pool from '@/app/lib/db.js';

dotenv.config();

export async function POST(request) {
 let {email, password} = await request.json();
 let user = await pool.query(`SELECT * FROM auth.users WHERE email = '${email}' AND password = '${password}' `)
 user = user.rows[0];
 if (user) {
  let token = jwt.sign(user, process.env.SUPABASE_KEY, { expiresIn: '720h' });

  return Response.json({token })
 } else {
  return Response.json({message :'user is not found',error:500 })
 }

}