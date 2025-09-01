import axios from "axios";
import dotenv from "dotenv";
import { google } from "googleapis";
import { Resend }  from 'resend';
import qs from 'qs';

dotenv.config();

const API_KEY = process.env.CLIENT_API_KEY;
const CX = process.env.CUSTOM_SEARCH_ENGINE_ID;
const resend = new Resend(process.env.RESEND_API_KEY);


async function duckduckgoSearch(props) {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(props.query)}&format=json`;
  try {
    const response = await axios.get(url);
    return { success: true, results: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function wikipediaSearch(props) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(props.query)}`;
  try {
    const response = await axios.get(url);
    return { success: true, results: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function getdate() {
  let date = new Date();
  return {
    date: date.getDate(),
    day: date.getDay(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  };
}

function removeJson(input) {
  return String(input).replace(/```json|```/g, '').trim();
}

async function listEmails(auth) {

  const gmail = google.gmail({ version: 'v1', auth });
  const emails = [];
  
  try {
    const res = await gmail.users.messages.list({ userId: 'me', maxResults: 5 });
    const messages = res.data.messages;
    
    if (!messages || messages.length === 0) return [];
    
    for (const msg of messages) {
      const msgData = await gmail.users.messages.get({ userId: 'me', id: msg.id });
      const headers = msgData.data.payload.headers;
      let body = Buffer.from(msgData.data.payload.body.data).toString('utf-8');
      const subject = headers.find(h => h.name === 'Subject')?.value || '(No Subject)';
      const from = headers.find(h => h.name === 'From')?.value || '(Unknown Sender)';
      emails.push({ subject, from, body });
    }
    
    return emails;
  } catch (error) {
    console.error('Error fetching emails:', error.message);
    return [];
  }
}

async function getUpcomingEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  
  
  try {
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 5,
      singleEvents: true,
      orderBy: 'startTime',
    });
    let results=res.data.items || [];
   
    return {results};
  } catch (err) {
    console.error('Error fetching events:', err);
    throw err;
  }
}

async function getWeather(props) {
  let city = props.city;
  let url = `https://www.metaweather.com/api/location/search/?query=${encodeURIComponent(city)}`;
  try {
    const searchRes = await axios.get(url);
    const woeid = searchRes.data[0]?.woeid;
    if (!woeid) return { success: false, message: 'City not found' };
    
    const weatherRes = await axios.get(`https://www.metaweather.com/api/location/${woeid}/`);
    return { success: true, results: weatherRes.data.consolidated_weather[0] };
  } catch (err) {
    console.error('Error:', err.message);
    return { success: false, message: err.message };
  }
}

async function searchSong(props) {
  const url = `https://saavn.dev/api/search/songs?query=${encodeURIComponent(props.query)}`;
  try {
    const response = await axios.get(url);
    return { success: true, results: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function searchInstagramUser(props) {
  const { username } = props;
  
  try {
    const response = await axios.get('https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/profile_by_username', {
      params: { username },
      headers: {
        'x-rapidapi-key': '05d737efe5msh5bee52fe6946501p188c2ajsne3551ca9293e',
        'x-rapidapi-host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com'
      }
    });
    
    return { success: true, user: response.data };
  } catch (error) {
    return { success: false, message: `Error fetching Instagram user: ${error.message}` };
  }
}

async function searchTwitterUser(props) {
  const { username } = props;
  const url = `https://twitter.com/${username}`;
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    return {
      success: response.status === 200,
      profileUrl: url,
      message: response.status === 200 ? 'User found.' : 'User not found.'
    };
  } catch (err) {
    return { success: false, message: `Error: ${err.message}` };
  }
}

async function searchTikTokUser(props) {
  const { username } = props;
  const url = `https://www.tiktok.com/@${username}`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    
    return {
      success: res.status === 200,
      profileUrl: url,
      message: res.status === 200 ? 'TikTok profile found.' : 'Profile not found.'
    };
  } catch (err) {
    return { success: false, message: `Error: ${err.message}` };
  }
}

async function searchYouTubeChannel(props) {
  const { query } = props;
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  try {
    await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    return { success: true, message: 'YouTube search URL generated.', searchUrl: url };
  } catch (err) {
    return { success: false, message: `Error: ${err.message}` };
  }
}

async function searchLinkedInProfile(props) {
  const { name } = props;
  const url = `https://www.google.com/search?q=site:linkedin.com/in+${encodeURIComponent(name)}`;
  return {
    success: true,
    message: 'LinkedIn search via Google',
    searchUrl: url
  };
}

async function searchgoogle(props) {
  const { query } = props;
  
  try {
    const response = await axios.get('https://google-search74.p.rapidapi.com/', {
      params: {
        query,
        limit: '10',
        related_keywords: 'true'
      },
      headers: {
        'x-rapidapi-key': '05d737efe5msh5bee52fe6946501p188c2ajsne3551ca9293e',
        'x-rapidapi-host': 'google-search74.p.rapidapi.com'
      }
    });
    
    return { success: true, results: response.data };
  } catch (error) {
    return { success: false, message: `Error fetching google: ${error.message}` };
  }
}

async function dounlodesongsportify(props) {
  const { id } = props;
  
  try {
    const response = await axios.get('https://spotify-downloader9.p.rapidapi.com/downloadSong', {
      params: {
        songId: id
      },
      headers: {
        'x-rapidapi-key': '05d737efe5msh5bee52fe6946501p188c2ajsne3551ca9293e',
        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
      }
    });
    
    return { success: true, results: response.data };
  } catch (error) {
    return { success: false, message: `Error downloading song: ${error.message}` };
  }
}

async function searchsongsportify(props) {
  const { query } = props;
  
  try {
    const response = await axios.get('https://spotify-downloader9.p.rapidapi.com/search', {
      params: {
        q: query,
        type: 'tracks',
        limit: '20',
        offset: '0',
        noOfTopResults: '5'
      },
      headers: {
        'x-rapidapi-key': '05d737efe5msh5bee52fe6946501p188c2ajsne3551ca9293e',
        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
      }
    });
    
    return { success: true, results: response.data };
  } catch (error) {
    return { success: false, message: `Error searching Spotify: ${error.message}` };
  }
}

/**
 * Send an email using Resend (free plan)
 * @param {string} to - Receiver email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 */
async function sendEmail(to, subject, html) {
  try {
    const response = await resend.emails.send({
      from: 'Jarvis next <onboarding@resend.dev>', // Free plan default sender
      to,
      subject,
      html,
    });

    console.log('✅ Email sent:', response);
    return response;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
}

async function facebook_auth(code,redirect_uri) {
  
 const tokenRes = await axios.get('https://graph.facebook.com/v22.0/oauth/access_token', {
      params: {
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: redirect_uri,
        code,
      },
    });
    
    const accessToken = tokenRes.data.access_token;
    

    const userRes = await axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`);
    
    
    let userI = userRes.data;
    
    return userI

}
async function ig_auth(code,redirect_uri) {
  
    let tokenRes = await axios.post(`https://api.instagram.com/oauth/access_token`,
      qs.stringify({
        'client_id': process.env.INSTAGRAM_APP_ID,
        'client_secret': process.env.INSTAGRAM_APP_SECRET,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
        'code':code
      })
      
    );
    
    let accessToken = tokenRes.data.access_token;
    
    // Optional: Fetch user info
    let userRes = await axios.get(`https://graph.instagram.com/me?fields=user_id,name,profile_picture_url&access_token=${accessToken}`);
    
  
    
    
    let user = userRes.data;
    return user
}

function welcomeHtml(sbuser) {
  return `<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to JARVIS</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #0b0f1a; color: #ffffff; margin: 0; padding: 0;">

  <div style="max-width: 600px; margin: auto; padding: 30px 20px; background: #1c1f2e; border-radius: 10px;">
    <h1 style="text-align: center; color: #00ffff;">Welcome to JARVIS</h1>
    <p style="font-size: 16px; line-height: 1.6; color: #d3d3d3;">
      Hello 👋 ${sbuser.name}
    </p>

    <p style="font-size: 16px; line-height: 1.6; color: #d3d3d3;">
      We're excited to have you on board. JARVIS is your smart AI assistant designed to boost your productivity, manage your tasks, and make your day easier.
    </p>

    <p style="font-size: 16px; line-height: 1.6; color: #d3d3d3;">
      You can now access the chat interface, voice assistant, and more features via the app or the website.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://jarvis-rose-zeta.vercel.app/" style="background-color: #00ffff; color: #0b0f1a; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">Get Started</a>
    </div>

    <p style="font-size: 14px; color: #888888; text-align: center;">
      This email was sent by JARVIS AI. If you have questions, contact us anytime.
    </p>
  </div>

</body>
</html>
`;
}

const tools = {
  getdate,
  duckduckgoSearch,
  removeJson,
  listEmails,
  getUpcomingEvents,
  getWeather,
  wikipediaSearch,
  searchSong,
  searchInstagramUser,
  searchTwitterUser,
  searchTikTokUser,
  searchYouTubeChannel,
  searchLinkedInProfile,
  searchgoogle,
  dounlodesongsportify,
  searchsongsportify
};

export default tools;
export {sendEmail,welcomeHtml, facebook_auth,ig_auth};



