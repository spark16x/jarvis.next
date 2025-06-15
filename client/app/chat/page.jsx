'use client'

import ChatInput from '@/components/chat_input.jsx';
import ProfileDropdown from '@/components/ProfileDropdown.jsx';
import ChatContainer from '@/components/ChatContainer.jsx';
import Message from '@/components/Message.jsx';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState();
  messages +=<Message message={text: 'hi how are you ', sender: 'jarvis' }/>

        
 messages +=<Message message ={ text: 'I am fine ', sender: 'user' } />
        
 messages +=<Message message ={ text: 'user is fine ', sender: 'system' } />
        
        // fetch('https://jarvis-rose-zeta.vercel.app/chat', {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ message })
        // })
        
        return (<div className="bg-zinc-800 w-full h-full flex justify-center-safe" >
    
<ChatContainer className="w-1/3 h-[90%] absolute left-1/3 rounded-md">
{messages}
</ChatContainer>

  <ChatInput  className="w-1/3 h-full relative "  />
  
      <ProfileDropdown avatarSrc="https://lh3.googleusercontent.com/a/ACg8ocKcC-LWcKIo-UKyA3pQ93FSPJWCyyaroaLFetoEZ0OuSm6uL49b=s96-c" userName = "Pratham vig" 
  className = 'absolute top-[10px] right-[10px] w-[30px] h-[30px]' />
  
  </div>)
      }