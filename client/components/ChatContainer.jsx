// components/ChatContainer.jsx
'use client';

import React, { useRef, useEffect } from 'react';

/**
 * A container component for displaying chat messages.
 * Automatically scrolls to the bottom when new messages are added.
 */
export default function ChatContainer({ children, className = '' }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [children]);
  
  return (
    <div
      ref={containerRef}
      className={`flex-grow overflow-y-auto px-1 py-4 text-zinc-200 custom-scrollbar ${className}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="flex flex-col space-y-6">
        {children}
      </div>
    </div>
  );
}