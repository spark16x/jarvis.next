import React, { useEffect, useRef, useState } from 'react';

const Home = ({ user }) => {
  const chatBoxRef = useRef();
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [toast, setToast] = useState(null);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  useEffect(() => {
    if (!user) {
      const anim = document.getElementById("homeAnimation");
      if (anim && window.gsap) {
        window.gsap.fromTo(anim, { opacity: 1 }, { opacity: 0, duration: 2.5, delay: 1.5, onComplete: () => anim.remove() });
      }
    } else {
      showToast(`Welcome back, ${user.firstname}!`, user.profile_pic, "success");
    }
  }, []);
  
  const sendMessage = async () => {
    if (!message.trim()) return;
    addMessage(message, true);
    setMessage('');
    const typing = document.createElement("div");
    typing.className = "text-gray-500 italic my-2";
    typing.textContent = "JARVIS is typing...";
    chatBoxRef.current.appendChild(typing);
    
    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      
      const data = await res.json();
      let response = data.response;
      
      if (response.includes('**')) {
        response = response.split('**').map((t, i) => (i % 2 ? `<b>${t}</b>` : t)).join(' ').split('*').join('<br/>');
      }
      
      addMessage(response, false);
    } catch {
      addMessage('Something went wrong', false);
    }
    
    typing.remove();
  };
  
  const addMessage = (text, isUser) => {
    const div = document.createElement("div");
    div.className = `rounded-lg px-4 py-2 my-2 w-fit max-w-[90%] ${
      isUser ? "bg-blue-600 text-white self-end" : "bg-gray-200 text-gray-800 self-start dark:bg-gray-700 dark:text-gray-100"
    }`;
    if (isUser) {
      div.textContent = text;
    } else {
      animateText(div, text);
    }
    chatBoxRef.current.appendChild(div);
    window.gsap?.from(div, { duration: 0.5, opacity: 0, y: 20 });
    chatBoxRef.current.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: 'smooth' });
  };
  
  const animateText = (element, text) => {
    element.innerHTML = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.innerHTML += text[i++];
        chatBoxRef.current.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: 'smooth' });
        setTimeout(type, 10);
      } else {
        element.innerHTML = text;
      }
    };
    type();
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  const showToast = (message, pic = null, type = 'info') => {
    setToast({ message, pic, type });
    setTimeout(() => setToast(null), 3500);
  };
  
  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return showToast("Voice recognition not supported.", null, "error");
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = e => {
      setMessage(e.results[0][0].transcript);
      sendMessage();
    };
    recognition.onerror = () => showToast("Voice recognition error.", null, "error");
    recognition.start();
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white relative transition-colors duration-300">
      <div className="flex justify-end gap-4 p-4">
        {!user ? (
          <>
            <button onClick={() => (window.location.href = '/auth/login')} className="btn">Login</button>
            <button onClick={() => (window.location.href = '/auth/signup')} className="btn">Sign Up</button>
          </>
        ) : (
          <button onClick={() => (window.location.href = '/logout')} className="btn">Logout</button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 flex flex-col" ref={chatBoxRef}></div>

      <div className="flex items-center gap-2 p-4 border-t border-gray-300 dark:border-gray-700">
        <input type="file" id="fileInput" hidden />
        <button onClick={() => document.getElementById("fileInput").click()} className="text-xl"><i className="fa-solid fa-paperclip" /></button>
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none"
          placeholder="Ask JARVIS..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={handleVoice}><i className="fa-solid fa-microphone" /></button>
        <button onClick={sendMessage}><i className="fa-solid fa-paper-plane" /></button>
      </div>

      {toast && (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.pic && <img src={toast.pic} alt="icon" className="w-6 h-6 rounded-full" />}
          <span>{toast.message}</span>
        </div>
      )}

      <button
        className="absolute top-4 right-4 text-2xl"
        onClick={toggleTheme}
      >
        <i className={`fa-solid fa-${theme === 'light' ? 'sun' : 'moon'}`} />
      </button>

      <audio id="welcomeSound" src="/sounds/welcome.mp3" preload="auto"></audio>

      {!user && (
        <div id="homeAnimation" className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white text-center space-y-2">
          <h1 className="text-4xl font-bold">Welcome to J.A.R.V.I.S</h1>
          <p className="text-lg">Smart, responsive and always ready</p>
        </div>
      )}
    </div>
  );
};

export default Home;