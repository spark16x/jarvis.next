// import dependencies
import dotenv from "dotenv";
import express from "express";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { GoogleGenAI } from "@google/genai";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import fs from "fs";
import mime from "mime-types";
import cookieParser from "cookie-parser";
import { createClient } from "@supabase/supabase-js";
import tools, { sendEmail, facebook_auth, welcomeHtml, ig_auth } from './function.js';
import systemInstruction from './systemInstruction.js';
import jwt from 'jsonwebtoken';
import qs from 'qs';
import FormData from 'form-data';
import cors from 'cors';
import { Pool } from 'pg'
// import {} from 'web-push';


// config dotenv
dotenv.config();

// define most importent varables
let app = express();
let PORT = process.env.PORT || 3000;
let apiKey = process.env.GEMINI_API_KEY;
let genAI = new GoogleGenAI(apiKey);
let oauth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'https://jarvisnext.vercel.app/auth/google/callback'
);

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

let generativeconfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  
  
};

// let model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
//   generativeconfig,
//   systemInstruction
// });

let __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);
let chat;


app.set("views", path.join(__dirname, 'views'));

// middalwaers
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());



// Middleware for Google Authentication
async function isAuth(req, res, next) {
  if (req.cookies.token) {
    
    let userinfo = jwt.verify(req.cookies.token, process.env.SUPABASE_KEY)
    req.user = userinfo;
    let prov = await supabase.from('id')
      .select().eq('id', userinfo.id).single();
    
    if (prov.data.Google) {
      req.user.google = true;
    }
    if (prov.data.Github) {
      req.user.github = true;
    }
    if (prov.data.Facebook) {
      req.user.facebook = true;
    }
    if (prov.data.Instagram) {
      req.user.instagram = true;
    }
    return next();
  } else {
    return next();
  }
}






app.get('/auth/signup', async (req, res) => {
  let user = await pool.query(`SELECT * FROM auth.users`)
  res.send(user)
})

// Sign up route 
app.post('/auth/signup', async (req, res) => {
  const { name, email, password, avatar, provider } = req.body;
  
  console.log('connecting client')
  const client = await pool.connect()
  console.log(' client connected')
  
  try {
    console.log('Createing user');
    
    let user = await client.query(`
 INSERT INTO auth.users(id, name, email, password, avatar,provider)
VALUES(gen_random_uuid(), '${name}', '${email}', '${password}', '${avatar}','${provider}')
RETURNING *`);
    
    user = user.rows[0];
    
    let providers = await client.query(`
 INSERT INTO auth.providers(id)
VALUES($1)`, [user.id]);
    
    console.log('Created user');
    
    res.send(`registation is sussfull of ${user.name}`);
  } catch (e) {
    throw e
  } finally {
    
    client.release();
    console.log('Disconnected client');
    
  }
  
})

// Login route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await pool.query(`SELECT * FROM auth.users WHERE email='${email}' AND password='${password}' `)
  user = user.rows[0];
  let token = jwt.sign(user, process.env.SUPABASE_KEY, { expiresIn: '720h' });
  res.json({ token })
})

// Google OAuth Login
app.get("/auth/google", async (req, res) => {
  let url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      // "https://www.googleapis.com/auth/calendar",
      // "https://mail.google.com/",
    ],
  });
  
  res.json({ url });
});

// Google OAuth Callback
app.post("/auth/google/callback", async (req, res) => {
  let { code } = req.body;
  
  try {
    let { tokens } = await oauth2Client.getToken({
      code,
      redirect_uri: process.env.REDIRECT_URI
    });
    
    oauth2Client.setCredentials(tokens);
    
    let oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
    let userInfo = await oauth2.userinfo.get();
    userInfo = userInfo.data;
    
    let user = await pool.query(`SELECT * FROM auth.providers WHERE google='${userInfo.id}' AND ' `);
    
    user = user.rows[0];
    
    
    
    
    if (!user || user.length == 0) {
      
      user = await pool.query(`
      INSERT INTO auth.users(id, name, email, password, avatar,provider)
      VALUES(gen_random_uuid(), '${userInfo.name}', '${userInfo.email}', '${null}', '${userInfo.picture}','google')
      RETURNING *`)
      
      user = user.rows[0];
      let providers = await pool.query(`
      INSERT INTO auth.providers(id,google)
      VALUES($1,$2)`, [user.id, userInfo.id])
      
      
      
      
      console.log(user)
      
      sendEmail(userInfo.email, 'Welcome to J.A.R..I.S', welcomeHtml(user))
    }
    
    let token = jwt.sign(user, process.env.SUPABASE_KEY, { expiresIn: '720h' });
    
    
    res.json({ token });
    
  } catch (error) {
    
    console.error("Error retrieving access token:", error.message);
    
    res.status(500).send('Authentication is failed');
    
  }
  
});

// Github OAuth Login
app.get("/auth/github", async (req, res) => {
  
  let url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=https://jarvis-rose-zeta.vercel.app/auth/github/callback&scope=user `;
  
  res.redirect(url);
});

// Github OAuth Callback
app.get('/auth/github/callback', async (req, res) => {
  
  let code = req.query.code;
  
  try {
    
    let { data } = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&redirect_uri=https://jarvis-rose-zeta.vercel.app/auth/github/callback&code=${code}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    })
    
    data = qs.parse(data)
    
    let user = await axios.get('https://api.github.com/user', {
      headers: { Authorization: 'Bearer ' + data.access_token }
    })
    
    user = user.data;
    
    console.log(user)
    
    data = await supabase.from('id').select('users_profile ( id,name,email,verfied_email,profile_pic )').eq('Github', user.id).single();
    
    let sbuser = data.data;
    
    if (sbuser || !sbuser == null) {
      sbuser = sbuser.users_profile
    }
    
    console.log(!sbuser || sbuser.length == 0)
    
    if (!sbuser || sbuser.length == 0) {
      
      data = await supabase.from('users_profile')
        .insert([{
          name: user.name,
          email: user.email,
          verfied_email: 1,
          profile_pic: user.avatar_url,
          provider: 'github'
        }])
        .select();
      
      console.log(data.error)
      
      sbuser = data.data[0];
      
      let id = await supabase.from('id')
        .insert([{
          id: sbuser.id,
          Github: user.id
        }]);
      
      sendEmail(sbuser.email, 'Welcome to J.A.R..I.S', welcomeHtml(sbuser))
      
    }
    
    console.log(sbuser)
    
    let token = jwt.sign(sbuser, process.env.SUPABASE_KEY, { expiresIn: '720h' });
    
    res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.redirect('/chat')
    
    
  } catch (e) {
    
    throw e
    
  }
  
})



// Facebook OAuth Login
app.get("/auth/facebook", async (req, res) => {
  
  let url = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${req.query.link?'https://jarvis-rose-zeta.vercel.app/auth/link/facebook':'https://jarvis-rose-zeta.vercel.app/auth/facebook/callback'}&scope=ads_read,email,public_profile `;
  
  res.redirect(url);
});

// Facebook OAuth Callback
app.get('/auth/facebook/callback', async (req, res) => {
  
  let code = req.query.code;
  try {
    
    let user = await facebook_auth(code, 'https://jarvis-rose-zeta.vercel.app/auth/facebook/callback')
    
    let data = await supabase.from('id').select('users_profile ( id,name,email,verfied_email,profile_pic )').eq('Facebook', user.id).single();
    
    let sbuser = data.data;
    
    if (sbuser || !sbuser.length == 0) {
      sbuser = sbuser.users_profile
    }
    
    console.log(!sbuser || sbuser.length == 0)
    
    if (!sbuser || sbuser.length == 0) {
      
      data = await supabase.from('users_profile')
        .insert([{
          name: user.name,
          email: user.email,
          verfied_email: 1,
          profile_pic: user.picture.data.url,
          provider: 'facebook'
        }])
        .select();
      
      console.log(data.error)
      
      sbuser = data.data[0];
      
      let id = await supabase.from('id')
        .insert([{
          id: sbuser.id,
          Facebook: user.id
        }]);
      
      sendEmail(sbuser.email, 'Welcome to J.A.R..I.S', welcomeHtml(sbuser))
      
    }
    
    console.log(sbuser)
    
    let token = jwt.sign(sbuser, process.env.SUPABASE_KEY, { expiresIn: '720h' });
    
    res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    
    res.redirect('/chat')
    
  } catch (e) {
    throw e
  }
  
})

// Facebook OAuth Callback
app.get('/auth/link/facebook', isAuth, async (req, res) => {
  
  let code = req.query.code;
  
  try {
    
    
    let user = await facebook_auth(code, 'https://jarvis-rose-zeta.vercel.app/auth/link/facebook');
    
    let data = await supabase.from('id').update({ Facebook: user.id }).eq('id', req.user.id);
    // res.json({id:req.user.id,data})
    
    res.redirect('/profile')
    
  } catch (e) {
    throw e
  }
  
})

// Instagarm OAuth Login
app.get("/auth/instagram", async (req, res) => {
  
  let url = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1674845279838372&redirect_uri=${req.query.link?'https://jarvis-rose-zeta.vercel.app/auth/link/instagram':'https://jarvis-rose-zeta.vercel.app/auth/instagram/callback'}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;
  
  res.redirect(url);
});

// Instagram OAuth Callback
app.get('/auth/instagram/callback', (req, res, next) => {
  if (!req.query.email) {
    return res.render('get-email', { code: req.query.code })
    
  } else {
    return next();
  }
}, async (req, res) => {
  
  let code = req.query.code;
  
  try {
    
    let user = await ig_auth(code, 'https://jarvis-rose-zeta.vercel.app/auth/instagram/callback');
    let data = await supabase.from('id').select('users_profile ( id,name,email,verfied_email,profile_pic )').eq('Instagarm', user.id).single();
    
    let sbuser = data.data;
    
    if (sbuser) {
      sbuser = sbuser.users_profile
    }
    
    
    if (!sbuser || sbuser.length == 0) {
      
      data = await supabase.from('users_profile')
        .insert([{
          name: user.name,
          email: req.query.email,
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
      
      sendEmail(sbuser.email, 'Welcome to J.A.R..I.S', welcomeHtml(sbuser))
      
    }
    
    console.log(sbuser)
    
    let token = jwt.sign(sbuser, process.env.SUPABASE_KEY, { expiresIn: '720h' });
    
    res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    
    res.redirect('/chat')
    
  } catch (e) {
    console.log(e);
    res.send('auth failed')
  }
  
})

app.get('/auth/link/instagram', isAuth, async (req, res) => {
  let code = req.query.code;
  try {
    let user = await ig_auth(code, 'https://jarvis-rose-zeta.vercel.app/auth/link/instagram');
    let data = await supabase.from('id').update({ Instagram: user.id }).eq('id', req.user.id);
    // res.json({id:req.user.id,data})
    
    res.redirect('/profile')
  } catch (e) {
    console.log(e)
    res.send('auth is failed')
  }
})


// Logout Route
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// Chat frontend
app.get('/chat', isAuth, async (req, res) => {
  
  // if user is login 
  if (req.user) {
    let userInfo = req.user
    
    // get history from supabase
    let { data, error } = await supabase
      .from("chat_history")
      .select("role, parts")
      .eq("user_id", userInfo.id)
      .order("created_at", { ascending: true });
    
    // if history is exsit so send history on frontend ,else send user profile with ematy  history
    if (!data.length == 0) {
      chat = model.startChat({ history: data });
      res.render("chat", { user: userInfo, history: data });
    } else {
      // send user profile
      let history = [{
        role: "user",
        parts: [{
          text: JSON.stringify({
            type: 'profile',
            profile: userInfo
          })
        }]
      }]
      
      // send history
      chat = model.startChat({ history });
      res.render("chat", { user: userInfo, history: null });
    }
  } else {
    // if user is not exist
    
    chat = model.startChat({ history: [] });
    res.render("chat", { user: null, history: null });
  }
  
})

// chat backend
app.post("/chat", async (req, res) => {
  // get user 
  // let user = req.user;
  
  try {
    
    // get message from req
    let { messages } = req.body;
    if (!messages) return res.json({ response: "Please enter a message." });
    
    // send message as a user and get response
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: messages,
    });
    console.log(response.text);
    // let user_mgs = [{
    //   role: 'user',
    //   parts: [{ text: message }],
    //   user_id: user.id
    // }]
    
    // convsrt response into json
    // let response = tools["removeJson"](response.text)
    // response = JSON.parse(response);
    
    // check the type of response and run functions based on type 
    return res.json({ response: response.text, file: response.file || [] });
    
    // while (true) {
    
    //   // if type is output
    //   if (response.type === "output") {
    
    //     // save history 
    //     // await supabase
    //     //   .from("chat_history")
    //     //   .insert(user_mgs);
    
    //     // await supabase
    //     //   .from("chat_history")
    //     //   .insert([{
    //     //     role: 'model',
    //     //     parts: [{ text: JSON.stringify(response) }],
    //     //     user_id: user.id
    //     //   }])
    
    //     // send responce 
    //     return res.json({ response: String(response.output), file: response.file || [] });
    
    //     // break loop
    //     break
    //   } 
    //   // else if (response.type === "action") {
    
    //   //   // if type is action 
    //   //   let fun = tools[response.function];
    //   //   let agr = response.params;
    
    //   //   // if oauth functions
    //   //   if (response.function === 'listEmails' || response.function === 'getUpcomingEvents') {
    //   //     // get user and token
    
    //   //     try {
    
    //   //       oauth2Client.setCredentials(JSON.parse(user.google_token));
    
    //   //       let fun_res = await fun(oauth2Client);
    //   //       message = JSON.stringify({ type: 'observation', observation: fun_res });
    
    //   //     } catch (e) {
    
    //   //       let fun_res = 'please verfy your google account'
    //   //     }
    
    //   //     // if non oauth functions
    //   //   } else {
    
    //   //     let fun_res = await fun(agr);
    //   //     message = JSON.stringify({ type: 'observation', observation: fun_res })
    //   //   }
    
    //   //   result = await chat.sendMessage(message)
    
    //   //   response = tools["removeJson"](result.response?.candidates?.[0]?.content?.parts?.[0]?.text)
    
    //   //   response = JSON.parse(response);
    
    //   // }
    
    // }
    
  } catch (error) {
    // log error 
    console.error("Server Error:", error.message);
    res.status(500).send('server having error pleace wait for fixing or inform developer  on spark2009971@gmail.com');
  }
});

// notifaction
app.post('/subscribe', (req, res) => {
  let { serializedSub } = req.body;
  let userAgent = req.get('User-Agent');
  let ip = req.ip;
  console.log('connecting client')
  const client = await pool.connect()
  console.log(' client connected')
  
  try {
    let user = await client.query(`
 INSERT INTO auth.users(id, sub, ip, user agent)
VALUES(gen_random_uuid(),'${serializedSub},'${ip}','${userAgent}')
RETURNING *`);
    
    
  } catch (e) {
    throw e
  } finally {
    
    client.release();
    console.log('Disconnected client');
    
  }
  
  res.json({ serializedSub, ip,userAgent })
})

//webhook
app.get('/webhook/:provider', (req, res) => {
  
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  
  if (mode === 'subscribe' && token === 'Pratham vig token') {
    
    res.status(200).send(challenge);
    
  } else {
    
    res.status(403).send(provider);
    
  }
});

app.post('/webhook', (req, res) => {
  
  let body = req.body;
  
  console.log('Received webhook:', body);
  
  res.sendStatus(200);
});

// Start Serve
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});