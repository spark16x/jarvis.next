import ChatInput from '@/components/chat_input.jsx';
import ProfileDropdown from '@/components/ProfileDropdown.jsx';

export default function Chat() {
  return (<div className="bg-zinc-800 w-full h-full flex justify-center-safe" >
    <ProfileDropdown avatarSrc="https://lh3.googleusercontent.com/a/ACg8ocKcC-LWcKIo-UKyA3pQ93FSPJWCyyaroaLFetoEZ0OuSm6uL49b=s96-c" userName = "User" options ={[]} 
  position = "top-left" className = '' />
  <ChatInput  className="w-1/2 h-full relative"  /></div>)
}

