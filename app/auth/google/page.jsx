export default function LoginPage() {
  let url;
  fetch('/api/google')
    .then((v) => {
      
      console.log(v)
    })
  
  return (<div>Redricting { url }</div>)
}