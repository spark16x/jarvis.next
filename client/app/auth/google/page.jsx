export default function LoginPage() {
  let url;
  fetch('https://jarvis-rose-zeta.vercel.app/auth/google')
    .then(async (v) => {
      url =await v.text()
    })
  
  return (<div>Redricting { url }</div>)
}