export default function ChatInput({className}) {
  return (<div className={className} > 
  <input type="text" placeholder="Type to chat" className=" w-full h-[50px] absolute bottom-[20px]" onChange={(e) => console.log(e.target.value)} ></input>
  </div>)
}