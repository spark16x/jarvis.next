export default function LoginPage() {
  let url;
  fetch('https://jarvisnext.vercel.app/api/google')
    .then((v) => {
      
      console.log(v)
    })
  
  return (<div>Redricting { v }</div>)
}