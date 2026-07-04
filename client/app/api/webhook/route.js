import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Received general Webhook:', body);
    return new NextResponse('OK', { status: 200 });
  } catch (err) {
    console.error("General Webhook POST parsing error:", err.message);
    return new NextResponse('OK', { status: 200 });
  }
}
export async function GET(request) {
  return new NextResponse('Jarvis Webhook Endpoint Active', { status: 200 });
}
