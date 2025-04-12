export default function ChatInput() {
  return (
    <div className="chat-input flex items-center gap-2 bg-gray-800 border border-white rounded-full px-4 py-2 w-full max-w-2xl mt-4">
      <button><i className="fa-solid fa-paperclip"></i></button>
      <input type="text" placeholder="Ask JARVIS..." className="flex-grow bg-transparent text-white outline-none" />
      <button><i className="fa-solid fa-microphone"></i></button>
      <button><i className="fa-solid fa-paper-plane"></i></button>
    </div>
  )
}
