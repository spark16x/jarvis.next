import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

/**
 * Retrieve the current authenticated user from session cookies.
 * Returns decoded JWT payload or null if unauthenticated.
 */
export async function getAuthUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    return jwt.verify(token, process.env.SUPABASE_KEY);
  } catch (error) {
    console.error("Auth token verification failed:", error.message);
    return null;
  }
}
