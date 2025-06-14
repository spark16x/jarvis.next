export default function LoginPage() {
  let result;
  fetch('https://jarvis-rose-zeta.vercel.app/auth/google')
    .then(async (v) => {
      result =await v.json()
    })
  
  return (<div>Redricting { result.url }</div>)
}