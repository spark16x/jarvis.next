'use client'

import { useState } from 'react';

export default function ChatInput({ className, onSendMessage }) { // <--- 1. onSendMessage is received as a prop
  const [input, setInput] = useState('');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input); // <--- 2. When message is ready, call the prop function with the input value
      setInput(''); // Clear the input
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
      <form onSubmit={handleSendMessage} className="relative w-full">
        <textarea
          placeholder="Type to chat..."
          className="w-full h-[50px] bg-zinc-700 text-white p-3 pr-12 rounded-full placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          style={{ minHeight: '50px', maxHeight: '150px', resize: 'none', overflowY: 'auto' }}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg>
        </button>
      </form>
    </div>
  );
}