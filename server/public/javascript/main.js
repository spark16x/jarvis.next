const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const micButton = document.getElementById("micButton");
const fileButton = document.getElementById("fileButton");
const fileInput = document.getElementById("fileInput");
let timeout, isMic;

userInput.focus();

function login() { window.location.href = '/auth/login'; }

function signup() { window.location.href = '/auth/signup'; }

function logout() { window.location.href = '/logout'; }

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.ctrlKey) {
    sendMessage();
    userInput.style.height = 'auto';
  }
});
userInput.addEventListener('input', () => {
  userInput.style.height = userInput.scrollHeight + 'px';
});
micButton.addEventListener("click", startVoiceRecognition);
fileButton.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    showToast(`Attached: ${file.name}`, null, "info");
  }
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  
  addMessage(message, true);
  userInput.value = "";
  sendButton.disabled = true;
  
  const typingDiv = document.createElement("div");
  typingDiv.className = "typing-indicator";
  typingDiv.textContent = "JARVIS is typing...";
  chatBox.appendChild(typingDiv);
  chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
  
  try {
    let response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: JSON.stringify({ type: 'user', user: message }) }),
    });
    
    response = await response.json();
    let file = response.file;
    response = response.response;
    speak(response)
    if (response.includes('**')) {
      response = response.split('**').map((t, i) => i % 2 === 0 ? t : `<b>${t}</b>`).join(' ').split('*').join('<br/>');
    }
    
    addMessage(response, false, file);
  } catch (e) {
    addMessage("Something went wrong", false);
  }
  
  chatBox.removeChild(typingDiv);
  sendButton.disabled = false;
}

function addMessage(text, isUser, file = null, pev = false) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", isUser ? "user-message" : "bot-message");
  
  if (pev) {
    if (text.includes('**')) {
      text = text.split('**').map((t, i) => i % 2 === 0 ? t : `<b>${t}</b>`).join(' ').split('*').join('<br/>');
    }
    messageDiv.innerHTML = text;
  } else {
    if (isUser) {
      messageDiv.innerHTML = text;
    } else {
      if (text.includes('**')) {
        text = text.split('**').map((t, i) => i % 2 === 0 ? t : `<b>${t}</b>`).join(' ').split('*').join('<br/>');
      }
      animateText(messageDiv, text, () => {
        messageDiv.innerHTML = text;
        if (file) {
          const fileDiv = document.createElement('div');
          fileDiv.classList.add('file_div', 'message');
          
          if (file.type.startsWith('image/')) {
            let img = document.createElement('img');
            img.src = file.url;
            img.alt = 'Image';
            fileDiv.appendChild(img);
          } else if (file.type.startsWith('audio/')) {
            let audio = document.createElement('audio');
            audio.src = file.url;
            audio.controls = true;
            fileDiv.appendChild(audio);
          } else if (file.type.startsWith('video/')) {
            let video = document.createElement('video');
            video.src = file.url;
            video.controls = true;
            video.style.maxWidth = '250px';
            video.style.borderRadius = '16px';
            fileDiv.appendChild(video);
          } else {
            let link = document.createElement('a');
            link.href = file.url;
            link.target = '_blank';
            link.download = file.name || 'file';
            link.innerHTML = `<i class="fas fa-file-alt"></i> Download ${file.name || 'file'}`;
            fileDiv.appendChild(link);
          }
          
          messageDiv.appendChild(fileDiv);
        }
      });
    }
  }
  
  chatBox.appendChild(messageDiv);
  gsap.from(messageDiv, { duration: 0.5, opacity: 0, y: 20 });
  chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
}

function animateText(element, text, callback) {
  element.innerHTML = "";
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text[i];
      chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
      i++;
      setTimeout(type, 10);
    } else if (callback) {
      callback();
    }
  }
  type();
}

function startVoiceRecognition() {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US'; // Set language
  
  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
      clearTimeout(timeout);
    }
    // Process the transcript, e.g., display it on the page
    console.log('Transcript:', transcript);
    userInput.value = transcript;
    timeout = setTimeout(() => sendMessage(), 2000);
    
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    // Handle errors, e.g., display an error message to the user
  };
  
  recognition.onend = () => {
    // Restart recognition after it ends
    recognition.start();
    showToast('Listening.....')
  };
  
  // Start speech recognition
  recognition.start();
  showToast('Listening.....')
  isMic = true;
}

function showToast(message, pic = null, type = 'info') {
  const toast = document.getElementById("toast");
  toast.hidden = false;
  toast.innerHTML = pic ? `<img src="${pic}" alt="icon"/>` : '';
  toast.innerHTML += `<span>${message}</span>`;
  toast.className = `show ${type}`;
  
  const sound = document.getElementById("welcomeSound");
  if (type === 'success' && sound) sound.play().catch(() => {});
  setTimeout(() => {
    toast.classList.remove("show", type);
  }, 3500);
}


document.querySelector('.pfp').addEventListener('click', () => {
  let nav = document.querySelector('.pfp-nav');
  if (nav.hidden) {
    nav.hidden = false
  } else {
    nav.hidden = true;
  }
})

function speak(text) {
  let s = speechSynthesis;
  let u = new SpeechSynthesisUtterance();
  if (text.includes('**')) {
    text = text.split('**').join(' ').split('*').join(' ');
  }
  u.text = text;
  u.voice = s.getVoices()[0];
  if (isMic) {
    s.speak(u);
    
  }
  
}