'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, provider: 'manual' })
      });
      if (res.ok) {
        router.push('/auth/login');
      } else {
        const errText = await res.text();
        setErrorMsg(errText || 'Registration failed. Try a different email.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-zinc-200 relative selection:bg-zinc-800 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 radial-glow pointer-events-none -z-10 opacity-70"></div>

      <div className="glass-panel max-w-sm w-full p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-white tracking-tight">Create Account</h2>
          <p className="text-xs text-zinc-400 font-mono">Join Jarvis AI</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-lg text-center text-xs text-red-400">
            {errorMsg}
          </div>
        )}

        <div className="space-y-3">
          {/* Google OAuth */}
          <Link href="/auth/google" className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/80 font-medium text-xs text-zinc-300 hover:text-white transition duration-300">
            <svg aria-label="Google logo" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path d="m0 0H512V512H0" fill="#fff" opacity="0"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>
            Continue with Google
          </Link>

          {/* GitHub OAuth */}
          <Link href="/auth/github" className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/80 font-medium text-xs text-zinc-300 hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            Continue with GitHub
          </Link>

          {/* Facebook OAuth */}
          <Link href="/auth/facebook" className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/80 font-medium text-xs text-zinc-300 hover:text-white transition duration-300">
            <svg aria-label="Facebook logo" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path fill="currentColor" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path>
            </svg>
            Continue with Facebook
          </Link>

          {/* Instagram OAuth */}
          <Link href="/auth/instagram" className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/80 font-medium text-xs text-zinc-300 hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
            Continue with Instagram
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 text-zinc-600 text-xs">
          <span className="w-full h-px bg-zinc-900"></span>
          <span>or</span>
          <span className="w-full h-px bg-zinc-900"></span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <input
              type="text"
              id="name"
              className="w-full bg-zinc-900/40 border border-zinc-850 focus:border-zinc-750 focus:outline-none focus:ring-1 focus:ring-zinc-800/40 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 transition duration-200"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <input
              type="email"
              id="email"
              className="w-full bg-zinc-900/40 border border-zinc-850 focus:border-zinc-750 focus:outline-none focus:ring-1 focus:ring-zinc-800/40 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 transition duration-200"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <input
              type="password"
              id="password"
              className="w-full bg-zinc-900/40 border border-zinc-850 focus:border-zinc-750 focus:outline-none focus:ring-1 focus:ring-zinc-800/40 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 transition duration-200"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <input
              type="password"
              id="confirm-password"
              className="w-full bg-zinc-900/40 border border-zinc-850 focus:border-zinc-750 focus:outline-none focus:ring-1 focus:ring-zinc-800/40 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 transition duration-200"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-medium py-3 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500 font-mono">
          Have an account?{' '}
          <Link href="/auth/login" className="text-zinc-300 hover:text-white underline transition">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;