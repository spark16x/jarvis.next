import { NextResponse } from 'next/server';

export default function middleware() {
  console.log('mid is ok')
  
  return NextResponse.next()
}