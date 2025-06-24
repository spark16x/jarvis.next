 export default function Notify() {
   const [message, setMessage] = useState('');
   
   return (<input
                type="email"
                id="email"
                className="shadow-sm p-[5px] focus:ring-blue-500 focus:border-blue-500 block w-full h-[50px] text-base border-gray-700 rounded-md bg-[#0000005e] text-white"
                placeholder="Your Email"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                /> 
     
   )
 }