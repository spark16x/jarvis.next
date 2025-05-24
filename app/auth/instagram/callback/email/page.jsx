'use client'

import { useSearchParams } from 'next/navigation';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export default function Email() {
  let params =useSearchParams();
  let user=jwt.verify(params.get('user'), process.env.SUPABASE_KEY)
  return (<div>name {user.name}</div>)
}