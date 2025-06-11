import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


export default function middleware(request) {
  let token=request.cookies.get('token');
  if ( request.cookies.has('token') ) {
    let user = jwt.verify(token, process.env.SUPABASE_KEY)
    console.log(user)
  }
  
  
  return NextResponse.next()
}

// export const config = {
//   matcher: '/chat',
// }