export default function LoginPage() {
  let url;
  fetch('https://jarvisnext.vercel.app/api/google')
    .then(async (v) => {
      url =await v.text()
    })
  
  return (<div>Redricting { url }</div>)
}