import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log(req.body)
  return NextResponse.json({body:request.body})
}