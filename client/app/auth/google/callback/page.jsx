'use client'

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function GoogleCallbackPage() {
  useEffect(() => {
    fetch('https://jarvis-rose-zeta.vercel.app/auth/google/callback',{
      method: 'POST',
      credentials: 'include',// 🔥 this is CRUCIAL
      
    })
      .then((res) => {
        console.log(res);
         
          window.location.href='https://jarvisnext.vercel.app/chat'
        
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return <div className=" bg-[black] w-full h-full flex items-center justify-center" >Oauth...</div>;
}
