import { useEffect } from 'react';

export default function GooglePage() {
  useEffect(() => {
    fetch('https://jarvis-rose-zeta.vercel.app/auth/google')
      .then((res) => {
        // If the backend returns a URL to redirect to
      
          console.log('Response:', res);
          // OR if backend gives JSON with a redirect URL
          res.json().then((data) => {
            if (data?.url) {
              // window.location.href = data.redirectUrl;
            }
          });
        
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return <div>Redirecting...</div>;
}
