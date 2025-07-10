'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    fetch('https://jarvis-rose-zeta.vercel.app/auth/google/callback', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
      .then((res) => {
        console.log(res);
        window.location.href = 'https://jarvisnext.vercel.app/chat';
      })
      .catch((err) => console.error('Fetch error:', err));
  }, [searchParams]);

  return (
    <div className="bg-black w-full h-screen flex flex-col items-center justify-center text-white font-mono">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>

      {/* Text */}
      <p className="text-white text-lg animate-pulse">
        Connecting to Google...
      </p>
    </div>
  );
}
