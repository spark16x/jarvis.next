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

export async function GET(request) {
  setupWebPush();
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT * FROM public.notification');
    return NextResponse.json({ users: result.rows });
  } catch (err) {
    console.error("List subscriptions error:", err);
    return new NextResponse("Server failed to list subscriptions.", { status: 500 });
  } finally {
    if (client) client.release();
  }
}

export async function POST(request) {
  setupWebPush();
  let client;
  try {
    const { serializedSub } = await request.json();
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    // Retrieve approximate IP address from headers
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    client = await pool.connect();
    const insertRes = await client.query(`
      INSERT INTO public.notification(id, sub, ip, "user agent")
      VALUES(gen_random_uuid(), $1, $2, $3)
      RETURNING *
    `, [JSON.stringify(serializedSub), ip, userAgent]);

    const user = insertRes.rows[0];

    // Send onboarding push notification
    try {
      await webpush.sendNotification(
        serializedSub,
        JSON.stringify({
          title: 'System Connected',
          body: `Jarvis push notifications active on ${userAgent}`,
          icon: '/imgs/logo.png',
        })
      );
    } catch (pushErr) {
      console.error("Failed to send onboarding push notification:", pushErr.message);
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Create subscription error:", err);
    return new NextResponse("Server failed to create push subscription.", { status: 500 });
  } finally {
    if (client) client.release();
  }
}
