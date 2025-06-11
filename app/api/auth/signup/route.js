import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log(request.body)
  return NextResponse.json({body:request.body})
}