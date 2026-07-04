'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatInput({ className = '', onSendMessage }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  
  // Adjust textarea height automatically based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const lineHeight = 20; // estimate line height in px
      const maxLines = 5;
      const maxHeight = lineHeight * maxLines + 16; // lines + padding
      
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [input]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSendMessage} className="relative w-full flex items-end bg-zinc-900/30 border border-zinc-850 focus-within:border-zinc-700/80 rounded-xl transition duration-300">
        <textarea
          ref={textareaRef}
          placeholder="Ask Jarvis anything..."
          className="w-full bg-transparent text-zinc-100 placeholder-zinc-650 text-sm py-3.5 pl-4 pr-12 resize-none focus:outline-none focus:ring-0 min-h-[48px] max-h-[120px] custom-scrollbar leading-5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <div className="absolute right-2.5 bottom-2">
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send">
              <path d="m22 2-7 20-4-9-9-4 20-7Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}