export default function GooglePage() {
  let result;
  fetch('https://jarvis-rose-zeta.vercel.app/auth/google')
    .then( (v) => {
      result = v
      console.log(v)
    })
  
  return (<div>Redricting  </div>)
}