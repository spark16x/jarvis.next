'use client'

import ChatInput from '@/components/chat_input.jsx';
import ProfileDropdown from '@/components/ProfileDropdown.jsx';
import ChatContainer from '@/components/ChatContainer.jsx';


import { redirect } from 'next/navigation';

export default function Chat() {
  return (<div className="bg-zinc-800 w-full h-full flex justify-center-safe" >
<ChatContainer classname="w-1/3 absolute left-1/3"/>
  <ChatInput  className="w-1/3 h-full absolute left-1/3 "  />
      <ProfileDropdown avatarSrc="https://lh3.googleusercontent.com/a/ACg8ocKcC-LWcKIo-UKyA3pQ93FSPJWCyyaroaLFetoEZ0OuSm6uL49b=s96-c" userName = "Pratham vig" options ={[{ label: "profile", onClick: ()=>{ redirect('/')   } }  ]} 
  position = "top-left" className = '' /></div>)
}