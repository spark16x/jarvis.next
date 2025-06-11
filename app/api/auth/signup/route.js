import { NextResponse } from 'next/server';
import { headers } from 'next/headers'


export async function POST(request) {
  const body = await headers();
 let name= body.get('name')
  return Response.json({ name })
}