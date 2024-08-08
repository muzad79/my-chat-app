import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import useListenMessages from '../../hooks/useListenMessages'

const Messages = () => {

  const lastMessageRef = useRef()
const{messages,loading}=useGetMessages()
useListenMessages()

useEffect(()=>{
setTimeout(()=>{

  lastMessageRef?.current?.scrollIntoView({behaviour:"smooth"})
},100)
},[messages])
console.log(messages)
  return (
    <div className='px-4 overflow-auto flex-1 '>
      {(!loading && messages.length>0) && messages.map((message)=>(
        <div key={message._id} ref={lastMessageRef}>


          <Message  message={message}/>
          </div>
      ))}
      {loading && [...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}
      {(!loading && messages.length == 0) && 
      <p className='text-center'>send a message to start conversation</p>
      }
        
       
    </div>
  )
}

export default Messages