'use client'

import { useState } from 'react';

export default function ChatInput({className}) {
   const [input, setInput] = useState('');
   
  return (<div className={className} > 
  <textarea  placeholder="Type to chat" className=" w-full h-[50px] absolute bottom-[20px] bg-zinc-700"  onChange={(e) => setInput(e.target.value)} >{input}</textarea>
  </div>)
}