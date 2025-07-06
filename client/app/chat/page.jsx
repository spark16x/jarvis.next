'use client'

import ChatInput from '@/components/chat_input.jsx';
import ProfileDropdown from '@/components/ProfileDropdown.jsx';
import ChatContainer from '@/components/ChatContainer.jsx';
import Message from '@/components/Message.jsx';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([{
    role: "model",
    parts: [{ text: "how I can help you?" }],
  }]);
  
  // let mgs = 
  
  function send(input) {
    
    let userMgs = {
      role: "user",
      parts: [{ text: input }],
    }
    
    let updateMgs = [...messages, userMgs];
    setMessages(updateMgs);
    
    // mgs = messages.map((v) =>
    //   (<Message message={v} />)
    // )
    
    
    fetch('https://jarvis-rose-zeta.vercel.app/chat', {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updateMgs })
      
    }).then((v) => {
      v.json().then((j) => {
        
        setMessages(prevMessages => [...prevMessages, {
          role: "model",
          parts: [{ text: j.response }],
        }]);
        
        // fetch('https://jarvis-rose-zeta.vercel.app/c', {
        //     method: 'GET',
        //     credentials: 'include' // 🔥 this is CRUCIAL
        //   })
        //   .then(res => res.json())
        //   .then(data => {
        //     console.log(data); // Cookie will be stored automatically if allowed
        //   });
        
        // messages.map((v) =>
        //   (<Message message={v} />)
        // )
      })
    })
    
    
    
    
    
  }
  
  
  return (<div className="bg-zinc-800 w-full h-full flex justify-center-safe" >
    
<ChatContainer className="sm:w-1/3 w-full h-[90%] absolute sm:left-1/3 top-px rounded-md z-10">
{ 
  messages.map((mgs,i) =>
  (<Message key={i} message={mgs} />)
)
}
</ChatContainer>

  <ChatInput  className=" sm:w-1/3 w-[90%] h-full relative "  onSendMessage={send} />
  
      <ProfileDropdown avatarSrc="https://lh3.googleusercontent.com/a/ACg8ocKcC-LWcKIo-UKyA3pQ93FSPJWCyyaroaLFetoEZ0OuSm6uL49b=s96-c" userName = "Pratham vig" 
  className = 'absolute top-[10px] right-[10px] w-[30px] h-[30px]' />
  
  </div>)
}