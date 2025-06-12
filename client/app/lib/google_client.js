import { OAuth2Client } from 'google-auth-library';
import dotenv from "dotenv";

dotenv.config();
const client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.BASE_URI + '/auth/google/callback'
);
export default client;