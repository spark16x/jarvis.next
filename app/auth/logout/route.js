import { NextResponse } from 'next/server';

export async function GET(request) {
  let cookie = await cookies();
  cookie.delete('token');
  
  return NextResponse.redirect('/auth/login');
}