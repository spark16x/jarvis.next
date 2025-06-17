'use client'

import ChatInput from '@/components/chat_input.jsx';
import ProfileDropdown from '@/components/ProfileDropdown.jsx';
import ChatContainer from '@/components/ChatContainer.jsx';
import Message from '@/components/Message.jsx';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: 'hi how are you ', sender: 'jarvis' },
    { text: 'I am fine ', sender: 'user' },
    { text: 'user is fine ', sender: 'system' }
  ]);
  let mgs = messages.map((v) =>
    (<Message message={v} />)
  )
  
  function send(input) {
    let newMessage = { text: input, sender: 'user' }
    setMessages(prevMessages => [...prevMessages, newMessage]);
    mgs = messages.map((v) =>
      (<Message message={v} />)
    )
    
    fetch('https://jarvis-rose-zeta.vercel.app/chat', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
      
    }).then((v) => {
      v.json().then((j) => {
        
        setMessages(prevMessages => [...prevMessages, { text: j.response, sender: 'jarvis' }]);
        mgs = messages.map((v) =>
          (<Message message={v} />)
        )
      })
    })
    
    
  }
  
  
  return (<div className="bg-zinc-800 w-full h-full flex justify-center-safe" >
    
<ChatContainer className="w-1/3 h-[90%] absolute left-1/3 rounded-md">
{ 
  mgs
}
</ChatContainer>

  <ChatInput  className=" sm:w-1/3 w-[90%] h-full relative "  onSendMessage={send} />
  
      <ProfileDropdown avatarSrc="https://lh3.googleusercontent.com/a/ACg8ocKcC-LWcKIo-UKyA3pQ93FSPJWCyyaroaLFetoEZ0OuSm6uL49b=s96-c" userName = "Pratham vig" 
  className = 'absolute top-[10px] right-[10px] w-[30px] h-[30px]' />
  
  </div>)
}