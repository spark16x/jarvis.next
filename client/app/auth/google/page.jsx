'use client'

import { useEffect } from 'react';

export default function GooglePage() {
  useEffect(() => {
    fetch('https://jarvis-rose-zeta.vercel.app/auth/google')
      .then((res) => {
        // If the backend returns a URL to redirect to
          console.log('Response:', res);
          res.json().then((data)=>{
            console.log(data?.url)
          })
         
          
        
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return <div>Redirecting...</div>;
}
