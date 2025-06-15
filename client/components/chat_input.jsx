'use client'

import { useState, useRef, useEffect } from 'react'; // Import useRef and useEffect

export default function ChatInput({ className, onSendMessage }) { // Re-added onSendMessage prop
  const [input, setInput] = useState('');
  const textareaRef = useRef(null); // Create a ref to access the textarea DOM element
  
  // Effect to adjust textarea height whenever the input value changes
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to 'auto' first to correctly calculate scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set height to scrollHeight, ensuring it doesn't exceed max rows
      const scrollHeight = textareaRef.current.scrollHeight;
      const lineHeight = parseFloat(getComputedStyle(textareaRef.current).lineHeight); // Get actual line height
      const maxLines = 4;
      const maxHeight = lineHeight * maxLines + parseFloat(getComputedStyle(textareaRef.current).paddingTop) + parseFloat(getComputedStyle(textareaRef.current).paddingBottom); // Calculate max height based on 4 lines + padding
      
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [input]); // Dependency array: run this effect whenever 'input' state changes
  
  // Function to handle sending the message
  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    if (input.trim()) { // Check if input is not just whitespace
      onSendMessage(input); // Call the prop function to send message to parent
      setInput(''); // Clear the input field after sending
      // Reset height explicitly after clearing input
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  // Handle Enter key for sending, Shift+Enter for new line
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // If Enter is pressed without Shift
      e.preventDefault(); // Prevent default new line on Enter
      handleSendMessage(e); // Trigger send
    }
    // If Shift+Enter, allow default behavior (new line in textarea)
  };
  
  return (
    <div className={className}>
      <form onSubmit={handleSendMessage} className="absolute bottom-[20px] w-full">
        <textarea
          ref={textareaRef} // Attach the ref to the textarea
          placeholder="Type to chat..."
          className="w-full bg-zinc-700 text-white p-3 pr-12 rounded placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto" // Keep overflow-y-auto for when max height is hit
          value={input} // Use value prop for controlled component
          onChange={(e) => setInput(e.target.value)} // Correctly use e.target.value
          onKeyDown={handleKeyDown} // Keydown handler for Enter to send, Shift+Enter for new line
          rows={1} // Start with 1 row, height will be adjusted by JS
          // Removed inline style for minHeight/maxHeight as they are now dynamically managed
          // The initial H-[50px] might be slightly different from 1 line height + padding,
          // so JS will adjust it based on content.
          // You might want to adjust your initial Tailwind `h-[50px]` class
          // to match the `minHeight` calculated based on one line height if needed for consistency.
        />
        {/* Send button */}
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