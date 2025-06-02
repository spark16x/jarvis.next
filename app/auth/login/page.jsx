import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const LoginPage = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Jarvis</title>
        
        
        {/* Font Awesome (Consider using a component library for icons in React) */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      </Head>

      <body className="bg-[url(/imgs/bg-mobile.jpg)] md:bg-[url(/imgs/bg-desktop.jpg)] bg-cover bg-center bg-no-repeat text-gray-200 font-sans flex justify-center items-center h-screen text-center overflow-hidden">
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
            <p className=" -translate-y-[20px] text-gray-400 mb-2">Or continue with</p>
          </div>
        </div>
      </body>
    </>
  );
};
export const metadata = {
  title: "J.A.R.V.I.S | LoginPage",
};
export default LoginPage;