'use client'

import { useSearchParams } from 'next/navigation'
import dotenv from "dotenv";
dotenv.config();

export default function Email() {
  let params =useSearchParams();
  let user=jwt.verify(params.get('user'), process.env.SUPABASE_KEY)
  return (<div>{user}</div>)
}