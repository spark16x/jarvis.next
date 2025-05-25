'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export default function Email() {
  const [user, setUser] = useState(null);
  let params = useSearchParams();
  
  
  const token = params.get('user');
  
  // Decoding token or verifying the token could be better done server-side
  const decodedUser = jwt.verify(token, process.env.SUPABASE_KEY)
  setUser(decodedUser);
  
  useEffect(() => { var script = document.createElement('script');
    script.src = "//cdn.jsdelivr.net/npm/eruda";
    document.body.appendChild(script);
    script.onload = function() { eruda.init() }() }, [])
    useEffect(() => { var script = document.createElement('script');
    script.src = "//cdn.jsdelivr.net/npm/eruda";
    document.body.appendChild(script);
    script.onload = function() { eruda.init() }() }, [])
    useEffect(() => { var script = document.createElement('script');
    script.src = "//cdn.jsdelivr.net/npm/eruda";
    document.body.appendChild(script);
    script.onload = function() { eruda.init() }() }, [])
  
  
  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}</p> // Adjust according to decoded token structure
      ) : (
        <p>Loading... {token}</p>
      )}
    </div>
  );
}