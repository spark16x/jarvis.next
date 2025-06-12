import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sendEmail, welcomeHtml, ig_auth } from '@/app/lib/function.js';
import supabase from '@/app/lib/supabase_client.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code');
  let cookie = await cookies();
  try {
    
    let user = await ig_auth(code, 'https://jarvisnext.vercel.app/auth/instagram/callback');
    let data = await supabase.from('id').select('users_profile ( id,name,email,verfied_email,profile_pic )').eq('Instagarm', user.id).single();
    
    let sbuser = data.data;
    
    if (sbuser) {
      sbuser = sbuser.users_profile
    }
    
    
    if (!sbuser || sbuser.length == 0) {
      
      data = await supabase.from('users_profile')
        .insert([{
          name: user.name,
          verfied_email: 0,
          profile_pic: user.profile_picture_url,
          provider: 'instagram'
        }])
        .select();
      
      console.log(data.error)
      
      sbuser = data.data[0];
      
      let id = await supabase.from('id')
        .insert([{
          id: sbuser.id,
          Instagram: user.id
        }]);
      
      cookie.set("id", sbuser.id, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 });
      return NextResponse.redirect(`${process.env.BASE_URI}/auth/instagram/callback/email?id=${sbuser.id}`);
    }
    
    
    console.log(sbuser)
    
    let token = jwt.sign(sbuser, process.env.SUPABASE_KEY, { expiresIn: '720h' });
    
    cookie.set("token", token, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    
    return NextResponse.redirect('/chat');
    
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'auth failed' })
  }
  
}