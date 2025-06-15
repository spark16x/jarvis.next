// components/Message.jsx
import React from 'react';

/**
 * Renders a single chat message bubble.
 *
 * @param {object} props
 * @param {object} props.message - The message object.
 * Expected structure: { text: string, sender: 'user' | 'jarvis' | 'system', id?: string }
 */
export default function Message({ message }) {
  const isUser = message.sender === 'user';
  const isJarvis = message.sender === 'jarvis';
  const isSystem = message.sender === 'system';
  
  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start' // Align user messages to the right, others to the left
      }`}
    >
      <div
        className={`max-w-[70%] p-3 rounded-lg shadow-md ${
          isUser
            ? 'bg-blue-600 text-white' // User message style
            : isJarvis
            ? 'bg-gray-700 text-white' // Jarvis message style
            : 'bg-yellow-600 text-white text-center' // System message style
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}