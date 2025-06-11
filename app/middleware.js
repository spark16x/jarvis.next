import { NextResponse } from 'next/server';

export async function Middleware() {
  let res =NextResponse.next();
  console.log('mid is ok')
  res.jaon({mid:true})
  return res
}