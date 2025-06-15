'use client'

import { useState } from 'react';

export default function ChatInput({ className  }) {
  const [input, setInput] = useState('');
  
  return (<div className={className} > 
  <form >
    <div className="rounded-full">
  <textarea  placeholder="Type to chat" className=" w-full h-[50px] absolute bottom-[20px] bg-zinc-700 rounded-full"  onChange={(e) => setInput(e.target.innerHtml)} >{input}</textarea>
  </div>

  </form>
  </div>)
}