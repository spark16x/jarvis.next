import ChatInput from '@/components/chat_input.jsx';

export default function Chat() {
  let input
  return (<div className="bg-zinc-800 w-full h-full flex justify-center-safe" > <ChatInput input={input} className="w-1/2 h-full relative" /></div>)
}