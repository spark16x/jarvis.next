import { NextResponse } from 'next/server';
import oauth2Client from '@/app/lib/google_client';

export async function GET() {
  try {
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent", // ensure refresh token is returned on every authentication attempt
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/calendar.readonly",
      ],
    });
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Google Auth url generation error:", err);
    return new NextResponse("Server failed to generate Google Auth URL.", { status: 500 });
  }
}
