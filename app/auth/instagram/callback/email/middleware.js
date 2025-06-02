import { NextResponse } from 'next/server';

export async function Middleware() {
  let res =NextResponse.next();
  res.jaon({mid:true})
  return res
}