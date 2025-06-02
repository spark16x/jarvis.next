'use client'

import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import bg_desktop from '@/public/imgs/bg-desktop.jpg';

const LoginPage = () => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleSubmit = (event) => {
    event.preventDefault();
    // Handle your signup logic here, e.g., sending data to an API
    console.log('Sign up data:', { name, email, password, confirmPassword });
    // You would typically add validation and error handling here
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // ... your signup API call ...
  };
  return (
    <>


      <body className="bg-[url(/imgs/bg-mobile.jpg)] md:bg-[url({bg_desktop})] bg-cover bg-center bg-no-repeat text-gray-200 font-sans flex justify-center items-center h-screen text-center overflow-hidden">
        <div className="auth-container border-1 border-gray-700 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in transition-all duration-300 hover:shadow-xl hover:scale-101 max-w-md w-full">
          <h2 className="text-white text-2xl font-bold mb-4 ">Login to Jarvis</h2>

          <div className=" mt-4 space-y-3">
            {/* Google OAuth */}
            <Link href="/auth/google" className="block btn oauth-btn google-btn w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md border border-gray-700 font-semibold text-gray-800 bg-white hover:bg-gray-100 transition-colors">
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
              Continue with Google
            </Link>

            {/* GitHub OAuth */}
            <Link href="/auth/github" className="block btn oauth-btn github-btn w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md border border-gray-700 font-semibold text-white bg-gray-700 hover:bg-gray-600 transition-colors">
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
              Continue with GitHub
            </Link>

            {/* Facebook OAuth */}
            <Link href="/auth/facebook" className="block btn oauth-btn facebook-btn w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md border border-gray-700 font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors">
              <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
              Continue with Facebook
            </Link>

            {/* Instagram OAuth */}
            <Link href="/auth/instagram" className="block btn oauth-btn instagram-btn w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md border border-gray-700 font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 to-pink-600 transition-colors">
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
              Continue with Instagram
            </Link>
            
            <div className="border-t border-gray-700 my-4"></div>
            <p className=" -translate-y-[28px] text-gray-400 mb-2">Or continue with</p>
            
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <input
                type="text"
                id="name"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full h-[150px] sm:text-sm border-gray-700 rounded-md bg-grey-700 text-gray-200"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-200"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="confirm-password"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-200"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
            >
              Sign Up
            </button>
          </form>
            
          </div>
        </div>
      </body>
    </>
  );
};

export default LoginPage;