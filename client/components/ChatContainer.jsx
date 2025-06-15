// components/ChatContainer.jsx
'use client';

import React, { useRef, useEffect } from 'react';

/**
 * A container component for displaying chat messages.
 * Automatically scrolls to the bottom when new messages are added.
 *
 * @param {object} props
 * @param {Array<Object>} props.messages - An array of message objects.
 * Each object should have at least:
 * { text: string, sender: 'user' | 'jarvis' | 'system', id?: string }
 * @param {string} [props.className] - Additional Tailwind CSS classes for the main container div.
 */
export default function ChatContainer({ messages = [], className = '' }) {
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div
      ref={messagesEndRef}
      className={`flex-grow overflow-y-auto p-4 bg-zinc-900 text-white custom-scrollbar ${className}`}
    >
      <div className="flex flex-col space-y-4">
        { /*messages.map((message) => (
          // <--- Render the Message component for each message
          <Message key={message.id || message.text + Math.random()} message={message} />
          // Using message.id as key is preferred if available and unique.
          // Fallback to text + random for demonstration, but use a real unique ID in production.
        ))*/}
        {messages.length === 0 && (
          <div className="text-center text-zinc-400 mt-20">
            <p>Start chatting with Jarvis!</p>
            <p>Type your first message below.</p>
          </div>
        )}
      </div>
      <div className="h-2"></div>
    </div>
  );
}