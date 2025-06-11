import { cookies } from 'next/headers';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token');
  let cookie= await cookies();
  cookie.set("token", token);
  return  Response.json({token })
}