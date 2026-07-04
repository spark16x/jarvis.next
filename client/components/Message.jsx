// components/Message.jsx
import React, { useState } from 'react';
import Markdown from 'react-markdown';

export default function Message({ message }) {
  const isUser = message.role === 'user';
  const isJarvis = message.role === 'model';
  const isSystem = message.role === 'system';

  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = message.parts[0]?.text;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error('Failed to copy message:', err));
    }
  };

  const handleLike = () => {
    setIsLiked(prev => !prev);
  };

  // Thinking state
  if (isSystem) {
    return (
      <div className="flex items-start gap-4 w-full">
        <div className="flex-1 space-y-1.5 py-2">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">JARVIS is thinking</span>
          <div className="flex items-center space-x-1 h-5 pl-1">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group flex w-full relative ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      {isUser ? (
        /* User bubble */
        <div className="relative max-w-[85%] bg-zinc-900 border border-zinc-850 text-zinc-200 px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed shadow-sm">
          <p className="whitespace-pre-wrap font-sans text-zinc-200">{message.parts[0]?.text}</p>
        </div>
      ) : (
        /* Jarvis/Model markdown text */
        <div className="flex items-start gap-4 w-full">
          <div className="flex-1 space-y-1.5 py-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">JARVIS</span>
              
              {/* Subtle hover controls */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800 rounded-md p-1">
                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="text-zinc-500 hover:text-zinc-300 p-1 rounded hover:bg-zinc-800 transition"
                  title="Copy response"
                >
                  {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2"/></svg>
                  )}
                </button>

                {/* Like button */}
                <button
                  onClick={handleLike}
                  className={`p-1 rounded hover:bg-zinc-800 transition ${isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-red-400'}`}
                  title="Like message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
              </div>
            </div>
            
            {/* Markdown core text */}
            <div className="text-sm text-zinc-350 leading-relaxed font-sans prose prose-invert prose-sm max-w-none break-words">
              <Markdown>{message.parts[0]?.text}</Markdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}