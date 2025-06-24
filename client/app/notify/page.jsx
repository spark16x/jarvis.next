'use client'

import { useState } from 'react';

 
 export default function Notify() {
   const [message, setMessage] = useState('');
   const [ip, setIp] = useState('');

   let users
   fetch('https://jarvis-rose-zeta.vercel.app/subscribe').
   then((v)=>{
     v.json().then((user) => {users=user})
   })
   
   return (<div>
     <input
                type="email"
                id="email"
                className="shadow-sm p-[5px] focus:ring-blue-500 focus:border-blue-500 block w-full h-[50px] text-base border-gray-700 rounded-md bg-[#0000005e] text-white"
                placeholder="Your Email"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                /> 
     
           <select value={ip} onChange={(e) => setIp(e.target.value)} >
            {
            users.map((v)=>{
              <option value={v.ip}>{v.ip}</option>
            })
              
            }

          </select>
   </div>)
 }