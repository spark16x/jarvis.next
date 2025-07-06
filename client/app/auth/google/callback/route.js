'use client'

import { useEffect } from 'react';

export default function GoogleCallbackPage() {
  useEffect(() => {
    fetch('https://jarvis-rose-zeta.vercel.app/auth/google/callback')
      .then((res) => {
        console.log(res);
         
          
        
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return <div className="w-full h-full flex items-center justify-center" >Oauth...</div>;
}
