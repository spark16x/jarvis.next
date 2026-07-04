import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isLink = searchParams.get('link');
  const base = process.env.BASE_URI || new URL(request.url).origin;
  
  const redirectUri = isLink 
    ? `${base}/auth/link/instagram` 
    : `${base}/auth/instagram/callback`;

  // Scopes list encoded properly
  const scopes = 'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights';
  const url = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1674845279838372&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopes)}`;
  
  return NextResponse.redirect(url);
}
