import { NextResponse } from 'next/server';

export async function GET(request, context) {
  // Await the dynamic params object in Next.js 15
  const params = await context.params;
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  const provider = params.provider;

  if (mode === 'subscribe' && token === 'Pratham vig token') {
    return new NextResponse(challenge, { status: 200 });
  } else {
    return new NextResponse(provider || 'Forbidden', { status: 403 });
  }
}

export async function POST(request, context) {
  const params = await context.params;
  try {
    const body = await request.json();
    console.log(`Received Webhook call for ${params.provider}:`, body);
    return new NextResponse('OK', { status: 200 });
  } catch (err) {
    console.error("Webhook POST parsing error:", err.message);
    return new NextResponse('OK', { status: 200 }); // Always acknowledge webhooks with 200 to prevent retries
  }
}
