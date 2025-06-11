import { cookies } from 'next/headers';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token');
  let cookie= await cookies();
  cookie.set("token", token,{ httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
  
  return  NextResponse.redeict({token })
}