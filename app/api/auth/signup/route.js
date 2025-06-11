import { NextResponse } from 'next/server';

export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}