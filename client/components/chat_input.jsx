'use client'

import { useState } from 'react';

export default function ChatInput({className}) {
   const [input, setInput] = useState('');
   
  return (<div className={className} > 
  <input type="text" placeholder="Type to chat" className=" w-full h-[50px] absolute bottom-[20px]" value={input} onChange={(e) => setInput(e.target.value)} ></input>
  </div>)
}