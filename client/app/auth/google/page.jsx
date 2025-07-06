'use client'

import { useEffect } from 'react';

export default function GooglePage() {
  useEffect(() => {
    fetch('https://jarvis-rose-zeta.vercel.app/auth/google')
      .then((res) => {
        // If the backend returns a URL to redirect to
          res.json().then((data)=>{
            window.location.href =data?.url
            console.log(data?.url)
          })
         
          
        
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return <div className="w-full h-full flex items-center justify-center" >Redirecting...</div>;
}
