import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  
  // Create absolute URL for redirect
  const redirectUrl = new URL('/auth/login', request.url);
  return NextResponse.redirect(redirectUrl);
}