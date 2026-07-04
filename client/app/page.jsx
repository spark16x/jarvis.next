"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter, faGithub, faThreads } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

export default function Home() {
  const [voiceHover, setVoiceHover] = useState(false);
  const [integratedservices, setintegratedservices] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);

  const handleMouseEnterv = () => setVoiceHover(true);
  const handleMouseLeavev = () => setVoiceHover(false);
  const handleMouseEnteri = () => setintegratedservices(true);
  const handleMouseLeavei = () => setintegratedservices(false);

  useEffect(() => {
    const banner = document.getElementById("consent-banner");
    const acceptBtn = document.getElementById("accept-consent");
    const consentGiven = localStorage.getItem("jarvis_consent");
    
    if (!consentGiven && banner) {
      banner.style.display = "block";
    }
    
    acceptBtn?.addEventListener("click", () => {
      localStorage.setItem("jarvis_consent", "true");
      if (banner) banner.style.display = "none";
    });
  }, []);

  function urlBase64ToUint8Array(base64String) {
    if (!base64String) return new Uint8Array();
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
      if (Notification.permission !== 'granted') {
        subscribeToPush();
      }
    } catch (e) {
      console.error("Service Worker registration failed:", e);
    }
  }

  async function subscribeToPush() {
    try {
      const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!key) {
        console.warn("Push subscription skipped: NEXT_PUBLIC_VAPID_PUBLIC_KEY is not configured.");
        return;
      }
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(key),
      });
      setSubscription(sub);
      const serializedSub = JSON.parse(JSON.stringify(sub));
      await fetch('/api/subscribe', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serializedSub })
      });
    } catch (e) {
      console.error("Failed to subscribe to push notification:", e);
    }
  }

  useGSAP(() => {
    let timeline = gsap.timeline();
    try {
      let hero = SplitText.create(".hero-header", { type: "chars" });
      let p = SplitText.create(".hero-p", { type: "words" });
      timeline.from(hero.chars, { y: '30', opacity: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" });
      timeline.from(p.words, { y: '20', opacity: 0, duration: 0.4, stagger: 0.02, ease: "power3.out" }, "-=0.3");
      timeline.from(".hero-cta", { opacity: 0, y: '20', duration: 0.5 }, "-=0.2");
    } catch (e) {
      // Fallback animations in case SplitText is unavailable or encounters errors
      timeline.from(".hero-header", { y: '30', opacity: 0, duration: 0.8, ease: "power3.out" });
      timeline.from(".hero-p", { y: '20', opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
      timeline.from(".hero-cta", { opacity: 0, y: '20', duration: 0.5 }, "-=0.4");
    }
  }, []);

  return (
    <div className="bg-zinc-950 text-zinc-200 min-h-screen flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
      {/* Radial ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] radial-glow pointer-events-none -z-10"></div>

      {/* Navbar */}
      <header className="border-b border-zinc-900/80 sticky top-0 bg-zinc-950/70 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-sm font-mono tracking-widest text-zinc-100 hover:text-white transition">
            JARVIS <span className="text-xs text-zinc-500 font-normal">v0.0.7</span>
          </Link>
          <nav className="flex space-x-6 items-center">
            <Link href="#features" className="text-xs font-mono text-zinc-400 hover:text-zinc-100 transition">Features</Link>
            <Link href="/auth/login" className="text-xs font-mono text-zinc-400 hover:text-zinc-100 transition">Login</Link>
            <Link href="/chat">
              <button className="border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-100 px-4 py-1.5 rounded-lg text-xs font-mono transition-all duration-300">
                Launch System
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content wrapper */}
      <main className="flex-grow max-w-6xl mx-auto px-6 w-full">
        {/* Hero Section */}
        <section className="py-24 md:py-32 flex flex-col lg:flex-row items-center gap-12 border-b border-zinc-900/50">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-900 bg-zinc-900/30 text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Core engine online
            </div>
            <h1 className="hero-header text-5xl md:text-6xl font-semibold text-white tracking-tight leading-tight">
              Meet Jarvis
            </h1>
            <p className="hero-p text-lg text-zinc-400 max-w-lg leading-relaxed mx-auto lg:mx-0">
              An intelligent, minimalist virtual assistant. Designed to orchestrate tasks, scheduling, automation, and information with clarity.
            </p>
            <div className="hero-cta pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/auth/signup">
                <button className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg text-sm transition duration-300">
                  Get Started Free
                </button>
              </Link>
              <Link href="/chat">
                <button className="w-full sm:w-auto px-6 py-3 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 text-zinc-300 hover:text-white rounded-lg text-sm transition duration-300">
                  Open Terminal
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="relative group max-w-md w-full border border-zinc-900 bg-zinc-900/20 p-2 rounded-2xl shadow-2xl backdrop-blur-sm">
              <Image 
                src="/imgs/jarvsi.png" 
                alt="Jarvis AI System" 
                width={500} 
                height={500} 
                className="rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700 w-full object-cover border border-zinc-800/40" 
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 space-y-12 border-b border-zinc-900/50">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono tracking-widest text-zinc-500 uppercase">System Core</h2>
            <p className="text-3xl font-semibold text-white tracking-tight">Powerful capabilities, clean execution</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Voice Control */}
            <div className="border border-zinc-900 bg-zinc-900/10 rounded-2xl p-6 hover:border-zinc-800 transition duration-300 flex flex-col justify-between">
              <div 
                className="relative h-44 w-full rounded-xl overflow-hidden mb-6 bg-zinc-950 border border-zinc-900/50 flex items-center justify-center"
                onMouseEnter={handleMouseEnterv} 
                onMouseLeave={handleMouseLeavev}
              >
                {voiceHover ? (
                  <video src="/videos/voice-control.mp4" className="w-full h-full object-cover" preload="none" autoPlay loop muted />
                ) : (
                  <Image src="/imgs/voice-control.png" fill className="object-cover opacity-80" alt="Voice Control" />
                )}
              </div>
              <div>
                <h3 className="text-base font-medium text-white mb-2 font-mono">01 / Voice System</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Natural language comprehension. Interact with your files and services using speech.
                </p>
              </div>
            </div>

            {/* Card 2: Integrated Services */}
            <div className="border border-zinc-900 bg-zinc-900/10 rounded-2xl p-6 hover:border-zinc-800 transition duration-300 flex flex-col justify-between">
              <div 
                className="relative h-44 w-full rounded-xl overflow-hidden mb-6 bg-zinc-950 border border-zinc-900/50 flex items-center justify-center"
                onMouseEnter={handleMouseEnteri} 
                onMouseLeave={handleMouseLeavei}
              >
                {integratedservices ? (
                  <video src="/videos/integrated-servicel.mp4" className="w-full h-full object-cover" preload="none" autoPlay loop muted />
                ) : (
                  <Image src="/imgs/integrated-services.png" fill className="object-cover opacity-80" alt="Integrated Services" />
                )}
              </div>
              <div>
                <h3 className="text-base font-medium text-white mb-2 font-mono">02 / Unified Integrations</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Connect seamlessly with email, calendars, translation, maps, and document repositories.
                </p>
              </div>
            </div>

            {/* Card 3: AI Personalization */}
            <div className="border border-zinc-900 bg-zinc-900/10 rounded-2xl p-6 hover:border-zinc-800 transition duration-300 flex flex-col justify-between">
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-6 bg-zinc-950 border border-zinc-900/50 flex items-center justify-center">
                <Image src="/imgs/artificial-intelligence.jpg" fill className="object-cover opacity-85 grayscale hover:grayscale-0 transition-all duration-500" alt="AI Personalization" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white mb-2 font-mono">03 / Personal Adaptability</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Learns from workflows, preferences, and context to deliver tailored, precise responses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 space-y-16 border-b border-zinc-900/50">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Architecture</h2>
            <p className="text-3xl font-semibold text-white tracking-tight">Engineered for absolute speed</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="space-y-2 border-l border-zinc-900 pl-4">
              <h3 className="text-sm font-semibold text-white font-mono">24/7 Autopilot</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Continuous automation loop running schedules even while offline.</p>
            </div>
            <div className="space-y-2 border-l border-zinc-900 pl-4">
              <h3 className="text-sm font-semibold text-white font-mono">Privacy-First</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Encrypted databases and explicit permission controls for integrations.</p>
            </div>
            <div className="space-y-2 border-l border-zinc-900 pl-4">
              <h3 className="text-sm font-semibold text-white font-mono">Omnipresent</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Synchronized states across web browsers, Android clients, and API layers.</p>
            </div>
            <div className="space-y-2 border-l border-zinc-900 pl-4">
              <h3 className="text-sm font-semibold text-white font-mono">Minimal Dashboard</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Clean visual layout without clutter, tailored to fast text keyboard access.</p>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-28 text-center space-y-6">
          <h2 className="text-4xl font-semibold text-white tracking-tight">Deploy your assistant today</h2>
          <p className="text-zinc-400 max-w-md mx-auto text-sm leading-relaxed">
            Zero configuration required. Authenticate and initialize your custom workspace in seconds.
          </p>
          <div className="pt-4">
            <Link href="/auth/signup">
              <button className="px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg text-sm transition duration-300">
                Create Free Account
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900/60 bg-zinc-950 text-zinc-500 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-mono text-zinc-400">JARVIS AI</p>
            <p className="text-[10px] text-zinc-600">&copy; {new Date().getFullYear()} Jarvis AI. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <Link href="/terms" className="hover:text-zinc-300 transition">Terms</Link>
            <Link href="/privacy" className="hover:text-zinc-300 transition">Privacy</Link>
            <Link href="/cookies" className="hover:text-zinc-300 transition">Cookies</Link>
          </div>
          <div className="flex space-x-4 items-center">
            <a href="https://www.instagram.com/spark16.x" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition">
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
            </a>
            <a href="https://twitter.com/spark2009" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition">
              <FontAwesomeIcon icon={faXTwitter} className="w-4 h-4" />
            </a>
            <a href="https://www.threads.net/@spark16.x" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition">
              <FontAwesomeIcon icon={faThreads} className="w-4 h-4" />
            </a>
            <a href="https://github.com/spark16x" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition">
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Minimal Consent Banner */}
      <div 
        id="consent-banner" 
        className="fixed bottom-6 right-6 max-w-sm glass-panel text-zinc-200 p-5 rounded-xl shadow-2xl z-50 transition-all duration-300"
        style={{ display: 'none' }}
      >
        <div className="space-y-4">
          <p className="text-xs leading-relaxed text-zinc-400">
            We use cookies to maintain session states and personalize notifications. By using Jarvis, you agree to our{' '}
            <Link href="/terms" className="text-zinc-200 underline hover:text-white">Terms</Link> and{' '}
            <Link href="/privacy" className="text-zinc-200 underline hover:text-white">Privacy Policy</Link>.
          </p>
          <div className="flex justify-end">
            <button 
              id="accept-consent" 
              className="bg-zinc-100 hover:bg-white text-zinc-950 text-xs px-3.5 py-1.5 rounded-md font-medium transition"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}