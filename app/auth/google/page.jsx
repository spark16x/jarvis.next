export default function LoginPage() {
  let url;
  fetch('/api/google')
    .then((v) => {
      
      v.text().
      
      then((u) => {
        url = u;
        
      })
    })
  
  return (<div>Redricting { url }</div>)
}