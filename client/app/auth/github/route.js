import { NextResponse } from 'next/server';

export async function GET(request) {
  const base = process.env.BASE_URI || new URL(request.url).origin;
  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${base}/auth/github/callback&scope=user`;
  return NextResponse.redirect(githubUrl);
}
