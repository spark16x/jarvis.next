import { NextResponse } from 'next/server';
import {sendEmail,welcomeHtml,ig_auth} from '@/components/function.js';
import supabase from '@/components/supabase_client.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  
   try {
  
    let user = await ig_auth(code, 'https://jarvisnext.vercel.app/auth/instagram/callback');
    let data = await supabase.from('id').select('users_profile ( id,name,email,verfied_email,profile_pic )').eq('Instagarm', user.id).single();
  
    let sbuser = data.data;
  
    if (sbuser ) {
      sbuser = sbuser.users_profile
    }
  
  
    if (!sbuser || sbuser.length == 0) {
  
      // data = await supabase.from('users_profile')
      //   .insert([{
      //     name: user.name,
      //     email: req.query.email,
      //     verfied_email: 0,
      //     profile_pic: user.profile_picture_url,
      //     provider: 'instagram'
      //   }])
      //   .select();
  
      // console.log(data.error)
  
      // sbuser = data.data[0];
  
      // let id = await supabase.from('id')
      //   .insert([{
      //     id: sbuser.id,
      //     Instagram: user.id
      //   }]);
  
      // sendEmail(sbuser.email, 'Welcome to J.A.R..I.S', welcomeHtml(sbuser))
     
 
 request.cookies.set("user", user, { httpOnly: true, secure: true, maxAge:  60 * 60 * 1000 });
  return NextResponse.redirect(`${process.env.BASE_URI}/auth/instagram/callback/email?user=${user}`);
    }
  
    console.log(sbuser)
  
    let token = jwt.sign(sbuser, process.env.SUPABASE_KEY, { expiresIn: '720h' });
  
    request.cookies.set("token", token, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
  
    return NextResponse.redirect('/chat');
  
  } catch (e) {
    console.log(e);
   return NextResponse.json({error:'auth failed'})
  }
  
}

 