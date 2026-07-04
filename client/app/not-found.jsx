// app/not-found.jsx
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-8xl font-mono font-extralight text-zinc-600 tracking-tighter animate-pulse">
          404
        </h1>
        <div className="space-y-2">
          <p className="text-lg font-medium text-zinc-200">
            Page Not Found
          </p>
          <p className="text-sm text-zinc-400">
            Jarvis was unable to find the requested resource.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300"
          >
            ← Return to HQ
          </Link>
        </div>
      </div>
    </div>
  );
}
