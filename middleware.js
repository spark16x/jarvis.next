import { NextResponse } from 'next/server';

export async function Middleware() {
  console.log('mid is ok')
  
  return NextResponse.next()
}