"use client";

import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter, faGithub, faThreads, faCoffee } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import Image from 'next/image'
import dotenv from "dotenv";

dotenv.config();

export default function Home() {
  const [voiceHover, setVoiceHover] = useState(false);
  const [integratedservices, setintegratedservices] = useState(false);
  
  const handleMouseEnterv = () => {
    setVoiceHover(true);
  };
  
  const handleMouseLeavev = () => {
    setVoiceHover(false);
  };
  const handleMouseEnteri = () => {
    setintegratedservices(true);
  };
  
  const handleMouseLeavei = () => {
    setintegratedservices(false);
  };
  
  useEffect(() => {
    const banner = document.getElementById("consent-banner");
    const acceptBtn = document.getElementById("accept-consent");
    const consentGiven = localStorage.getItem("jarvis_consent");
    
    if (!consentGiven) {
      banner.style.display = "block";
    }
    
    acceptBtn?.addEventListener("click", () => {
      localStorage.setItem("jarvis_consent", "true");
      banner.style.display = "none";
    });
  }, []);
  
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
  
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])
  
  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }
  
  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      ),
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    // await subscribeUser(serializedSub)
  }
  
  
  
  
  return (
    <>
     
      <body className="bg-gray-900 text-white font-sans">
        {/* Navbar */}
        <header className="bg-gray-950 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-500">Jarvis</h1>
            <nav className="hidden md:flex space-x-6 items-center">
              <Link href="#features" className="text-gray-300 hover:text-white">Features</Link>
              <Link href="#get-started" className="text-gray-300 hover:text-white">Get Started</Link>
              <Link href="/auth/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link href="/chat">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl ml-2 transition">
                  Launch
                </button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left py-20 px-6 gap-8" data-aos="fade-up">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold mb-4">Meet Jarvis</h1>
            <p className="text-xl text-gray-300 mb-6">
              Your intelligent, all-in-one virtual assistant for tasks, information, productivity, and automation.
            </p>
            <ul className="text-left text-gray-400 mb-6 list-disc list-inside">
              <li>Voice + Text Chat Interface</li>
              <li>Real-Time Web & App Control</li>
              <li>AI-Powered Scheduling, Email & Social Media</li>
              <li>Smart Home & IoT Integration</li>
            </ul>
            <div className="flex items-center space-x-4 mb-6">
              <Link href="/auth/signup">
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg transition">
                  Get Started Free
                </button>
              </Link>
              <Link href="https://www.buymeacoffee.com/yourusername" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-yellow-400 hover:text-yellow-300">
                <a href="https://www.buymeacoffee.com/spark16x"><Image src="https://img.buymeacoffee.com/button-api/?text=Buy me  coffee&emoji=☕&slug=spark16x&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
              </Link>
            </div>
          </div>
          <Image src="/imgs/jarvsi.png" alt="Jarvis AI" className="rounded-2xl shadow-lg w-full max-w-md" />
        </section>

        {/* Features */}
        <section id="features" className="bg-gray-800 py-16 px-6" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-center mb-10">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div onMouseEnter={handleMouseEnterv} onMouseLeave={handleMouseLeavev} >
                 {voiceHover ?
                 <video src="/videos/voice-control.mp4" className="mx-auto mb-4 rounded" alt="Voice Control"  preload="none"  autoPlay loop />:
                 <Image src="/imgs/voice-control.png" className="mx-auto mb-4 rounded" alt="voice control" />}
                 </div>

              <h3 className="text-2xl font-semibold mb-2">Voice Control</h3>
              <p className="text-gray-400">Control your system using natural language in real-time.</p>
            </div>
            <div>
              <div onMouseEnter={handleMouseEnteri} onMouseLeave={handleMouseLeavei} >
               { integratedservices ?
               <video src="/videos/integrated-servicel.mp4" className="mx-auto mb-4 rounded" alt="Voice Control"  preload="none"  autoPlay loop />:
              <Image src="/imgs/integrated-services.png" className="mx-auto mb-4 rounded" alt="Integrated Services" /> 
                 
               }
              </div>
              <h3 className="text-2xl font-semibold mb-2">Integrated Services</h3>
              <p className="text-gray-400">Email, Weather, News, Translate, Maps, Calendar, Drive, and more!</p>
            </div>
            <div>
              <Image src="https://cdn.pixabay.com/photo/2020/07/01/12/58/artificial-intelligence-5352181_960_720.jpg" className="mx-auto mb-4 rounded" alt="AI Personalization" />
              <h3 className="text-2xl font-semibold mb-2">AI Personalization</h3>
              <p className="text-gray-400">Jarvis learns your habits, preferences, and tailors responses to you.</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-gray-900 py-16 px-6" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Jarvis?</h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-2">24/7 AI at Your Service</h3>
              <p className="text-gray-400">Jarvis never sleeps. Get instant answers, updates, and actions anytime.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-400">Your data is encrypted, and you control your history and preferences.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Cross-Platform Access</h3>
              <p className="text-gray-400">Use Jarvis on the web, Android, or smart devices with seamless sync.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Custom Dashboard</h3>
              <p className="text-gray-400">Get widgets, themes, avatars, and integrations for a personal experience.</p>
            </div>
          </div>
        </section>

        {/* Get Started */}
        <section id="get-started" className="text-center py-20 px-6" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4">Start using Jarvis today</h2>
          <p className="text-gray-300 mb-6">No installation required. Sign up and get your assistant running in minutes.</p>
          <Link href="/auth/signup">
            <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-white text-lg transition">
              Create Free Account
            </button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-gray-950 text-center text-sm text-gray-500 py-6 border-t border-gray-800">
          <p>&copy; 2025 Jarvis AI. All rights reserved.</p>
          <div className="mt-2 space-x-4 flex justify-center items-center">
            <Link href="/terms" className="hover:underline text-gray-400">Terms of Service</Link>
            <Link href="/privacy" className="hover:underline text-gray-400">Privacy Policy</Link>
            <Link href="/cookies" className="hover:underline text-gray-400">Cookie Policy</Link>
            <a href="https://www.instagram.com/spark16.x" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="https://twitter.com/spark2009" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faXTwitter} size="lg" />
            </a>
            <a href="https://www.threads.net/@spark16.x" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faThreads} size="lg" />
            </a>
            <a href="https://github.com/spark16x" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </div>
        </footer>

        {/* Consent Banner */}
        <div id="consent-banner" className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50 transition-all duration-300" style={{ display: 'none' }}>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              By using Jarvis AI, you agree to our
              <Link href="/terms" className="text-blue-400 underline hover:text-blue-300">Terms</Link>,
              <Link href="/privacy" className="text-blue-400 underline hover:text-blue-300">Privacy Policy</Link>, and
              <Link href="/cookies" className="text-blue-400 underline hover:text-blue-300">Cookie Policy</Link>.
            </p>
            <button id="accept-consent" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm rounded-xl text-white transition">
              Accept
            </button>
          </div>
        </div>
      </body>
    </>
  );
}