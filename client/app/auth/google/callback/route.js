import { NextResponse } from 'next/server';
import client from '@/app/lib/google_client.js';
import { google } from "googleapis";
import db from '@/app/lib/db.js';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code');
  
  
  try {
    let { tokens } = await client.getToken({
      code,
      redirect_uri: process.env.REDIRECT_URI
    });
    
    client.setCredentials(tokens);
    
    let oauth2 = google.oauth2({ auth: client, version: "v2" });
    let userInfo = await oauth2.userinfo.get();
    
    userInfo = userInfo.data;
    return NextResponse.json({ userInfo })
    
    //   let supa_user = await supabase.from('id')
    //     .select('users_profile ( id,name,email,verfied_email,profile_pic )').eq('Google', userInfo.id).single();
    
    //   supa_user = supa_user.data;
    
    //   if (supa_user || !supa_user.length == 0) {
    //     supa_user = supa_user.users_profile
    //   }
    
    //   console.log(!supa_user || supa_user.length == 0)
    
    //   if (!supa_user || supa_user.length == 0) {
    
    //     supa_user = await supabase.from('users_profile')
    //       .insert([{
    //         name: userInfo.given_name + ' ' + userInfo.family_name,
    //         email: userInfo.email,
    //         verfied_email: 1,
    //         profile_pic: userInfo.picture,
    //         provider: 'google'
    //       }])
    //       .select();
    
    //     supa_user = supa_user.data[0];
    
    //     let id = await supabase.from('id')
    //       .insert([{
    //         id: supa_user.id,
    //         Google: userInfo.id
    //       }]);
    
    //     console.log(supa_user)
    
    //     sendEmail(userInfo.email, 'Welcome to J.A.R..I.S', welcomeHtml(supa_user))
    //   }
    
    //   let token = jwt.sign(supa_user, process.env.SUPABASE_KEY, { expiresIn: '720h' });
    
    //   res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    
    //   res.redirect("/chat");
    
  } catch (error) {
    
    console.error("Error retrieving access token:", error.message);
    
    res.status(500).send('Authentication is failed');
    
  }
  
  
  
  
  
}