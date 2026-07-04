import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isLink = searchParams.get('link');
  const base = process.env.BASE_URI || new URL(request.url).origin;
  
  const redirectUri = isLink 
    ? `${base}/auth/link/facebook` 
    : `${base}/auth/facebook/callback`;

  const url = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=ads_read,email,public_profile`;
  
  return NextResponse.redirect(url);
}
