let email=document.querySelector('#email'), password=document.querySelector('#password'),btn=document.querySelector('#signup-button');

btn.addEventListener('click',send())
async function send() {
  
  try {
    let response = await fetch('/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

  } catch (e) {
    throw e
  }
  

}