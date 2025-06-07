import { OAuth2Client } from 'google-auth-library';

export const client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.BASE_URI + '/auth/google/callback'
);