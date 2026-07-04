'use client';

import ChatInput from '@/components/chat_input.jsx';
import ProfileDropdown from '@/components/ProfileDropdown.jsx';
import ChatContainer from '@/components/ChatContainer.jsx';
import Message from '@/components/Message.jsx';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [{ text: "Hello, I am Jarvis. How can I help you today?" }],
    },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function handleNewChat() {
    setMessages([
      {
        role: "model",
        parts: [{ text: "New conversation started. How can I assist you?" }],
      },
    ]);
  }

  function send(input) {
    const userMgs = {
      role: "user",
      parts: [{ text: input }],
    };

    const updateMgs = [...messages, userMgs];
    setMessages(updateMgs);

    // Render system thinking state temporarily
    setMessages(prev => [...prev, { role: "system", parts: [{ text: "" }] }]);

    fetch('/api/chat', {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updateMgs })
    })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error("Server error");
      }

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setMessages(prev => {
          const cleaned = prev.filter(msg => msg.role !== 'system');
          return [...cleaned, { role: "model", parts: [{ text: data.response }] }];
        });
        return;
      }

      // Remove the system thinking state and add an empty model message for streaming
      setMessages(prev => {
        const cleaned = prev.filter(msg => msg.role !== 'system');
        return [...cleaned, { role: "model", parts: [{ text: "" }] }];
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          accumulatedText += chunk;
          
          setMessages(prev => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last && last.role === 'model') {
              last.parts = [{ text: accumulatedText }];
            }
            return updated;
          });
        }
      }
    })
    .catch((err) => {
      console.error(err);
      setMessages(prevMessages => {
        const cleaned = prevMessages.filter(msg => msg.role !== 'system');
        const hasModelMsg = cleaned[cleaned.length - 1]?.role === 'model';
        if (hasModelMsg) {
          return cleaned;
        }
        return [
          ...cleaned,
          {
            role: "model",
            parts: [{ text: "Sorry, I encountered an error communicating with the server. Please verify your connection." }],
          }
        ];
      });
    });
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex text-zinc-200 selection:bg-zinc-800 selection:text-white overflow-hidden relative">
      
      {/* Sidebar Panel */}
      <aside className={`fixed md:relative top-0 bottom-0 left-0 z-30 w-64 bg-zinc-900 border-r border-zinc-900/80 flex flex-col justify-between transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-full md:w-0'}`}>
        <div className="p-4 flex flex-col space-y-6 h-full overflow-hidden">
          {/* Sidebar Logo */}
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm font-mono tracking-widest text-zinc-100">
              JARVIS <span className="text-[10px] text-zinc-500 font-normal">v0.0.7</span>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition"
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* New Chat Button */}
          <button 
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 py-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 text-xs font-mono text-zinc-300 hover:text-white rounded-lg transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            New Session
          </button>

          {/* Previous Chats (Mock/Static list to represent rich visual design) */}
          <div className="flex-grow overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
            <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-600 px-2 mt-4 mb-2">Sessions</p>
            <div className="px-3 py-2 rounded-lg bg-zinc-800/40 border border-zinc-850 text-xs text-zinc-200 cursor-pointer font-mono truncate">
              Active Conversation
            </div>
            <div className="px-3 py-2 rounded-lg hover:bg-zinc-800/40 text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer font-mono truncate transition">
              Integrated Services
            </div>
            <div className="px-3 py-2 rounded-lg hover:bg-zinc-800/40 text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer font-mono truncate transition">
              Voice Control Config
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
          <Link href="/auth/logout" className="text-zinc-500 hover:text-white transition flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            Logout
          </Link>
          <span className="text-[10px] text-zinc-650">v0.0.7</span>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen relative">
        
        {/* Header Bar */}
        <header className="h-14 border-b border-zinc-900/60 flex items-center justify-between px-6 bg-zinc-950/40 backdrop-blur-md z-20">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="text-zinc-400 hover:text-white p-1.5 rounded-lg border border-zinc-900 hover:border-zinc-800 bg-zinc-900/20 transition"
                aria-label="Open sidebar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white font-mono">JARVIS Engine</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ProfileDropdown 
              avatarSrc="https://lh3.googleusercontent.com/a/ACg8ocKcC-LWcKIo-UKyA3pQ93FSPJWCyyaroaLFetoEZ0OuSm6uL49b=s96-c" 
              userName="Pratham Vig" 
              className="w-7 h-7 hover:opacity-80 transition cursor-pointer"
            />
          </div>
        </header>

        {/* Message Feeds Scroll Panel */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="max-w-2xl mx-auto w-full flex-grow flex flex-col justify-between py-6 px-4">
            <ChatContainer className="w-full">
              {messages.map((mgs, i) => (
                <Message key={i} message={mgs} />
              ))}
              <div ref={messagesEndRef} />
            </ChatContainer>
          </div>
        </div>

        {/* Chat Input Area */}
        <div className="border-t border-zinc-900 bg-zinc-950/60 backdrop-blur-md py-4 px-6 z-25">
          <div className="max-w-2xl mx-auto w-full">
            <ChatInput className="w-full relative" onSendMessage={send} />
            <p className="text-[10px] text-zinc-600 font-mono text-center mt-2.5">
              Jarvis can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}