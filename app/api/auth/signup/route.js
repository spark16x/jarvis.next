import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import pool from '@/app/lib/db.js';


export async function POST(request) {
  let client=await pool.connect();
  const body = await headers();
 let name= body.get('name')
 let eamil= body.get('eamil')
 let password= body.get('password')
 
 let user=await client.query(`
 INSERT INTO auth.users(id, name, email, password, avatar)
VALUES(gen_random_uuid(), '${name}', '${email}', '${password}', 'null')
RETURNING *`
   
 )

  return Response.json({user,pool,client})
}