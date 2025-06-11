import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export default function middleware(request) {
  if (request.cookies.has('token')) {
    let user = jwt.verify(request.cookies.get('token'), process.env.SUPABASE_KEY)
    console.log(user)
  }
  
  
  return NextResponse.next()
}