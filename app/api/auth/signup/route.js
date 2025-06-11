import { NextResponse } from 'next/server';
import { headers } from 'next/headers'


export async function POST(request) {
  const res = await headers();
  return Response.json({ res })
}