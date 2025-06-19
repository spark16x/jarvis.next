// Jarvis Futuristic Homepage UI (Updated Based on Screenshot)

"use client";

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter, faGithub, faThreads } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

export default function Home() {
  const [voiceHover, setVoiceHover] = useState(false);
  const [integratedservices, setintegratedservices] = useState(false);

  const handleMouseEnterv = () => setVoiceHover(true);
  const handleMouseLeavev = () => setVoiceHover(false);
  const handleMouseEnteri = () => setintegratedservices(true);
  const handleMouseLeavei = () => setintegratedservices(false);

  useEffect(() => {
    const banner = document.getElementById("consent-banner");
    const acceptBtn = document.getElementById("accept-consent");
    const consentGiven = localStorage.getItem("jarvis_consent");
    if (!consentGiven) banner.style.display = "block";
    acceptBtn?.addEventListener("click", () => {
      localStorage.setItem("jarvis_consent", "true");
      banner.style.display = "none";
    });
  }, []);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-black text-white font-[Orbitron]">
        {/* Navbar */}
        <header className="bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-cyan-400 tracking-wide">JARVIS</h1>
            <nav className="hidden md:flex space-x-6 items-center">
              <Link href="#features" className="text-gray-400 hover:text-white">Features</Link>
              <Link href="#get-started" className="text-gray-400 hover:text-white">Get Started</Link>
              <Link href="/auth/login" className="text-gray-400 hover:text-white">Login</Link>
              <Link href="/chat">
                <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-full transition">Launch</button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center text-center py-24 px-6">
          <h1 className="text-5xl font-bold text-cyan-400 mb-4 neon-text">THE FUTURE IS NOW - WITH JARVIS</h1>
          <p className="text-lg text-gray-300 max-w-xl mb-10">Welcome to the next generation of AI assistants – responsive, smart, and built for tomorrow.</p>

          <div className="relative">
            <Image src="/imgs/jarvsi.png" alt="Jarvis AI" width={350} height={350} className="rounded-xl border border-gray-700 shadow-xl" />
            <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-6 bg-transparent border border-cyan-400 text-cyan-400 px-6 py-3 rounded-full hover:bg-cyan-400 hover:text-black transition">
              Explore More →
            </button>
          </div>

          {/* Left Model Icons */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 space-y-4 hidden md:flex flex-col items-center">
            {["/imgs/avatar1.png", "/imgs/avatar2.png", "/imgs/avatar3.png"].map((src, i) => (
              <Image key={i} src={src} alt="model" width={40} height={40} className="rounded-full border border-cyan-400 hover:scale-110 transition" />
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-gray-900 py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-10 text-cyan-400">Core Features</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="glass-card p-6">
              <div onMouseEnter={handleMouseEnterv} onMouseLeave={handleMouseLeavev}>
                {voiceHover ? <video src="/videos/voice-control.mp4" className="mx-auto rounded-xl" autoPlay loop muted /> : <Image src="/imgs/voice-control.png" width={300} height={200} alt="Voice Control" className="mx-auto rounded-xl" />}
              </div>
              <h3 className="text-2xl font-semibold mt-4">Voice Control</h3>
              <p className="text-gray-400">Command your digital world in real-time with natural language.</p>
            </div>
            <div className="glass-card p-6">
              <div onMouseEnter={handleMouseEnteri} onMouseLeave={handleMouseLeavei}>
                {integratedservices ? <video src="/videos/integrated-servicel.mp4" className="mx-auto rounded-xl" autoPlay loop muted /> : <Image src="/imgs/integrated-services.png" width={300} height={200} alt="Integrated Services" className="mx-auto rounded-xl" />}
              </div>
              <h3 className="text-2xl font-semibold mt-4">Integrated Services</h3>
              <p className="text-gray-400">Google APIs, news, maps, translate, email – all in one hub.</p>
            </div>
            <div className="glass-card p-6">
              <Image src="https://cdn.pixabay.com/photo/2020/07/01/12/58/artificial-intelligence-5352181_960_720.jpg" width={300} height={200} className="mx-auto rounded-xl" alt="AI" />
              <h3 className="text-2xl font-semibold mt-4">AI Personalization</h3>
              <p className="text-gray-400">Jarvis learns your style and tailors its intelligence to match.</p>
            </div>
          </div>
        </section>

        {/* Consent Banner */}
        <div id="consent-banner" className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50 transition-all duration-300 hidden">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              By using Jarvis AI, you agree to our <Link href="/terms" className="text-cyan-400 underline hover:text-cyan-300">Terms</Link>,
              <Link href="/privacy" className="text-cyan-400 underline hover:text-cyan-300">Privacy</Link> and
              <Link href="/cookies" className="text-cyan-400 underline hover:text-cyan-300">Cookies</Link>.
            </p>
            <button id="accept-consent" className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-sm rounded-xl text-white transition">
              Accept
            </button>
          </div>
        </div>
      </body>
    </>
  );
          }
                
