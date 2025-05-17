import Head from 'next/head'
import ChatBox from '../components/ChatBox'
import ChatInput from '../components/ChatInput'
import AuthButtons from '../components/AuthButtons'
import IframeContainer from '../components/IframeContainer'
import MusicPlayerContainer from '../components/MusicPlayerContainer'
import Toast from '../components/Toast'

export default async function Home() {
  
  console.log()
  return (
    <>
      <Head>
        <title>J.A.R.V.I.S {await fetch('https://jarvis-rose-zeta.vercel.app/')}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      </Head>
      <IframeContainer />
      <MusicPlayerContainer />
      <AuthButtons />
      <main className="flex flex-col justify-center items-center h-screen bg-black text-white font-poppins px-4">
        <ChatBox />
        <ChatInput />
        <Toast />
      </main>
    </>
  )
}