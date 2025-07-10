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

  return ( 
  <div className="bg-black w-full h-screen flex flex-col items-center justify-center text-white font-mono">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>

      {/* Text */}
      <p className="text-white text-lg animate-pulse">
        Redirecting to Google...
      </p>
    </div>
);
}
