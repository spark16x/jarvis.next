import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1674845279838372&redirect_uri=https://jarvis-rose-zeta.vercel.app/auth/instagram/callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights'
  
  return NextResponse.redirect(url);
}
