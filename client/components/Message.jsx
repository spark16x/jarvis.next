// components/Message.jsx
import React, { useState } from 'react'; // Import useState for the like functionality

/**
 * Renders a single chat message bubble with interactive options on hover.
 *
 * @param {object} props
 * @param {object} props.message - The message object.
 * Expected structure: { text: string, sender: 'user' | 'jarvis' | 'system', id?: string }
 * @param {function} [props.onReply] - Callback function to invoke when the reply button is clicked, passes the message object.
 */
export default function Message({ message, onReply }) {
  const isUser = message.sender === 'user';
  const isJarvis = message.sender === 'jarvis';
  const isSystem = message.sender === 'system';

  // Check if it's a system message that should display a thinking animation
  const isThinkingPrompt = isSystem && message.text === 'Thinking...';

  // Local state for the 'like' status of this message bubble
  // In a real application, this would typically come from global state or a backend.
  const [isLiked, setIsLiked] = useState(false);

  // --- Action Handlers ---

  const handleCopy = () => {
    if (message.text) {
      navigator.clipboard.writeText(message.text)
        .then(() => console.log('Message copied to clipboard!'))
        .catch(err => console.error('Failed to copy message:', err));
    }
  };

  const handleLike = () => {
    setIsLiked(prev => !prev); // Toggle the liked state visually
    console.log(`Message ${isLiked ? 'unliked' : 'liked'}:`, message.text);
    // In a real app, you would dispatch an action or make an API call to record the like/unlike.
  };

  const handleReply = () => {
    if (onReply && message) {
      onReply(message); // Call the parent's onReply function with the message object
    }
    console.log('Preparing to reply to message:', message.text);
  };

  // --- Styling Classes ---
  const bubbleBgClass = isUser
    ? 'bg-blue-600' // Blue for user messages
    : isJarvis
    ? 'bg-gray-700' // Gray for Jarvis messages
    : 'bg-yellow-600'; // Yellow for system messages

  const textColorClass = 'text-white'; // All messages have white text

  return (
    // The outer div is the `group` for Tailwind's group-hover utilities
    // It also defines the flex alignment for the message bubble itself
    <div
      className={`flex items-start mb-4 ${
        isUser ? 'justify-end' : 'justify-start' // Align entire message row (bubble + actions)
      }`}
    >
      {/* Message Bubble - this is where the text content is */}
      {/* It's made `relative` to allow absolute positioning of action buttons inside/next to it */}
      <div
        className={`relative group max-w-[70%] p-3 rounded-lg shadow-md ${bubbleBgClass} ${textColorClass}`}
      >
        {/* Conditional rendering for thinking prompt vs. regular text */}
        {isThinkingPrompt ? (
          <div className="flex items-center justify-center space-x-1 h-5">
            <span className="typing-dot w-2 h-2 bg-white rounded-full"></span>
            <span className="typing-dot w-2 h-2 bg-white rounded-full"></span>
            <span className="typing-dot w-2 h-2 bg-white rounded-full"></span>
          </div>
        ) : (
          <p>{message.text}</p>
        )}

        {/* Action buttons (Copy, Like, Reply) - appear on hover */}
        {/* These actions should generally not appear for system messages */}
        {!isSystem && (
          <div
            className={`absolute flex items-center p-1 rounded-md bg-zinc-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10
              ${isUser ? 'left-[-4px] translate-x-[-100%]' : 'right-[-4px] translate-x-[100%]'} -top-2`}
              // Positioning:
              // `left-[-4px] translate-x-[-100%]` for user messages (aligned right): moves actions to the left of the bubble
              // `right-[-4px] translate-x-[100%]` for Jarvis messages (aligned left): moves actions to the right of the bubble
              // `-top-2` places them slightly above the bubble's top edge
          >
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="text-zinc-400 hover:text-white p-1 rounded-full transition-colors duration-150"
              title="Copy message"
            >
              {/* Copy SVG Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2"/></svg>
            </button>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`p-1 rounded-full transition-colors duration-150 ${isLiked ? 'text-red-500' : 'text-zinc-400 hover:text-red-400'}`}
              title={isLiked ? "Unlike message" : "Like message"}
            >
              {/* Heart SVG Icon (filled if liked) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>

            {/* Reply Button */}
            <button
              onClick={handleReply}
              className="text-zinc-400 hover:text-white p-1 rounded-full transition-colors duration-150"
              title="Reply to message"
            >
              {/* Reply SVG Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}