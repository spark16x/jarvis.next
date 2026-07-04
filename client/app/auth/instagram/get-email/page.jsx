'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function EmailPromptForm() {
  const [email, setEmail] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code) {
      router.push('/auth/login');
      return;
    }
    // Redirect to Instagram callback route with code and email
    const callbackUrl = `/auth/instagram/callback?code=${encodeURIComponent(code)}&email=${encodeURIComponent(email)}`;
    window.location.href = callbackUrl;
  };

  return (
    <div className="glass-panel max-w-sm w-full p-8 rounded-2xl shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight">Email Required</h2>
        <p className="text-xs text-zinc-400 font-mono">Verify details for Instagram</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <input
            type="email"
            id="email"
            className="w-full bg-zinc-900/40 border border-zinc-850 focus:border-zinc-750 focus:outline-none focus:ring-1 focus:ring-zinc-800/40 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 transition duration-200"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-medium py-3 rounded-xl transition duration-300"
        >
          Complete Sign In
        </button>
      </form>

      <p className="text-center text-xs text-zinc-500 font-mono">
        Want to cancel?{' '}
        <Link href="/auth/login" className="text-zinc-300 hover:text-white underline transition">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default function InstagramGetEmailPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-zinc-200 relative selection:bg-zinc-800 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 radial-glow pointer-events-none -z-10 opacity-70"></div>

      <Suspense fallback={
        <div className="text-center text-xs font-mono text-zinc-500 animate-pulse">
          Loading auth state...
        </div>
      }>
        <EmailPromptForm />
      </Suspense>
    </div>
  );
}
