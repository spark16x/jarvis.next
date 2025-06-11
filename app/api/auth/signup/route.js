import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import db from '@/app/lib/db.js';


export async function POST(request) {
  const body = await headers();
 let name= body.get('name')
 let eamil= body.get('eamil')
 let password= body.get('password')
 
 let user=await db.query(`
 INSERT INTO auth.users(id, name, email, password, avatar)
VALUES(gen_random_uuid(), '${name}', '${email}', '${password}', 'null')
RETURNING *`
   
 )

  return Response.json(user)
}