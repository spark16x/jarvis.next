'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

export default function Email() {
  const [user, setUser] = useState(null);
  let params = useSearchParams();
  
  useEffect(() => {
    const token = params.get('user');
    if (token) {
      try {
        // Decoding token or verifying the token could be better done server-side
        const decodedUser =  jwt.verify(token, process.env.SUPABASE_KEY) 
        setUser(decodedUser);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, [params]);

  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}</p> // Adjust according to decoded token structure
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
