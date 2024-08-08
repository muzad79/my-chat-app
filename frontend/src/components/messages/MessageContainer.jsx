import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {

 
   const{selectedConversation,setSelectedConversation}= useConversation()
   console.log(selectedConversation)

   useEffect(()=>{
    return ()=>
        setSelectedConversation(null)
    

   },[])
  return (
    <div className='md:min-w-[450px] flex flex-col'>
        
        {
            !selectedConversation?(<NoMessageSelected/>):(
            <>
            {/* Header */}
        <div className='bg-slate-500 px-4 py-2 mb-2 flex gap-2'>
        <span className='label-text'>To:</span>
        <span className='text-gray-900 font-bold'>{selectedConversation?.fullname}</span>

    </div>
    <Messages/>
    <MessageInput/>
        
        
        </>
            )
}

    </div>
  )
}

export default MessageContainer

const NoMessageSelected =()=>{
    const{authUser} =  useAuthContext()
    return (
        <div className='flex items-center w-full h-full justify-center'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullname} ❄️</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='3xl md:text-6xl text-center'/>


            </div>


        </div>

    )

}