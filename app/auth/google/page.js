'use server'

import { redirect } from 'next/navigation'
import client from '/components/google_client.js';

export  function google() {
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