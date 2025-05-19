'use server'

import { redirect } from 'next/navigation'
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();



export async  function google() {
  let client=new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.BASE_URI+'auth/google/callback'
);
  let url = client.generateAuthUrl({
  access_type: "offline",
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    // "https://www.googleapis.com/auth/calendar",
    // "https://mail.google.com/",
  ],
});
redirect(url);
}
