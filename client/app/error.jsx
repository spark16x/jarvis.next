'use client'

import Head from 'next/head';
import Link from 'next/link';

// _error.jsx is a special file in Next.js for custom error pages.
// It receives a `statusCode` prop, which is the HTTP status code of the error.
const ErrorPage = ({ statusCode }) => {
  const errorMessage = statusCode ?
    `An error ${statusCode} occurred on server` :
    'An unexpected client-side error occurred';
  
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{statusCode} Error - Jarvis AI</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4">
        <div className="text-center">
          {/* Animated Error Icon/Illustration */}
          <div className="relative mb-8">
            {/* You can use a different image for general errors, or a more abstract icon */}
            <img
              src="/imgs/error-icon.png" // Placeholder, replace with an actual error icon or illustration
              alt="Error Illustration"
              className="w-48 h-48 mx-auto animate-pulse-slow" // A slower pulse for general errors
              onError={(e) => { e.target.onerror = null; e.target.src="/imgs/error-placeholder.png"; }} // Fallback
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-extrabold text-red-600 opacity-20 -z-10 animate-pulse-fade">
              {statusCode || 'Error'} {/* Display status code or 'Error' */}
            </div>
          </div>

          <h1 className="text-6xl font-extrabold text-red-500 mb-4 animate-slide-in-up">
            {statusCode || 'Error'}
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in delay-200">
            {errorMessage}
          </p>
          <p className="text-lg text-gray-400 mb-8 animate-fade-in delay-300">
            We apologize for the inconvenience. Please try again later.
          </p>

          <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition duration-300 transform hover:scale-105 animate-fade-in delay-400">
            Go back to the Homepage
          </Link>
        </div>
      </div>

      <style jsx>{`
        /* Keyframes for animations */
        @keyframes pulse-slow {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes pulse-fade {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.2; }
        }

        @keyframes slide-in-up {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Apply animations using Tailwind's arbitrary values or add to tailwind.config.js */
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-fade {
          animation: pulse-fade 4s ease-in-out infinite;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </>
  );
};



export default ErrorPage;