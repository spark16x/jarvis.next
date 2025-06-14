import { NextResponse } from 'next/server';


export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code');
  
   fetch('https://jarvis-rose-zeta.vercel.app/auth/google/callback', {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ code })
 }).then((v) => {
   v.json().then((result) => {
     console.log(result.token)
     redirect(`/api/cookie?token=${result.token}`)
   })
 })
}