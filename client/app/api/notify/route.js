import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import webpush from 'web-push';

function setupWebPush() {
  const pubKey = process.env.VAPID_PUBLIC_KEY;
  const privKey = process.env.VAPID_PRIVATE_KEY;
  if (pubKey && privKey) {
    try {
      webpush.setVapidDetails(
        'mailto:spark2009971@gmail.com',
        pubKey,
        privKey
      );
    } catch (e) {
      console.error("Vapid set error:", e.message);
    }
  }
}

export async function POST(request) {
  setupWebPush();
  let client;
  try {
    const { message, id, title, icon, sendCount = 1 } = await request.json();

    client = await pool.connect();
    const result = await client.query('SELECT * FROM public.notification WHERE id=$1', [id]);
    const user = result.rows[0];

    if (!user) {
      return new NextResponse("Subscription not found", { status: 404 });
    }

    // Parse sub field in case it is stored as JSON string
    let subObj = user.sub;
    if (typeof subObj === 'string') {
      try {
        subObj = JSON.parse(subObj);
      } catch (e) {
        console.error("Sub parsing error:", e);
      }
    }

    for (let i = 0; i < sendCount; i++) {
      await webpush.sendNotification(
        subObj,
        JSON.stringify({
          title,
          body: message,
          icon: icon || 'https://jarvisnext.vercel.app/imgs/logo.png',
        })
      );
    }

    return NextResponse.json({ user, sendCount });
  } catch (err) {
    console.error("Send notifications error:", err);
    return new NextResponse("Server failed to send notifications.", { status: 500 });
  } finally {
    if (client) client.release();
  }
}
