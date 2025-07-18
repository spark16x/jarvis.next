// app/not-found.js
'use client'

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-black flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl p-10 text-center shadow-[0_0_30px_#00ffff40]">
        <h1 className="text-7xl font-extrabold text-cyan-400 drop-shadow-glow animate-pulse">
          404
        </h1>
        <p className="text-xl text-gray-300 mt-4 mb-6">
          You’re lost in the multiverse. Jarvis couldn't locate that page. 🧭
        </p>

        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition-all duration-300 shadow-lg hover:scale-105"
        >
          ⬅️ Return to HQ
        </Link>

        <div className="mt-10 text-xs text-gray-500 italic animate-fade-in">
          Jarvis is recalibrating the quantum pathways...
        </div>
      </div>

      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px #00ffff) drop-shadow(0 0 20px #00ffff);
        }
        .animate-fade-in {
          animation: fadeIn 3s ease-in-out infinite alternate;
        }
        @keyframes fadeIn {
          from {
            opacity: 0.2;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
