import { NextResponse } from 'next/server';
import client from '@/app/lib/google_client.js';
import dotenv from "dotenv";
dotenv.config();



export async function GET() {
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  });

  return NextResponse.redirect(url);
}
