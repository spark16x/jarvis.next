import { NextResponse } from 'next/server';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code');
  
return  NextResponse.json({code})
  
}