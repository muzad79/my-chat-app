import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import axios from 'axios'
import toast from 'react-hot-toast'

const useGetMessages = () => {
  const [loading,setLoading]  = useState(false)

  const{messages,setMessages,selectedConversation} = useConversation()


  useEffect(()=>{

    const getMessages = async()=>{
        setLoading(true)
    
    
        try{

            const res = await axios.get(`/api/message/${selectedConversation._id}`)
      if(res.status != 200){
        throw new Error(res.data.error)
      }
      setMessages(res.data)

      
        }
        catch(err){
            toast.error(err.message)
            
        }
        finally{
            setLoading(false)

        }
      }

if(selectedConversation?._id)getMessages()

  },[selectedConversation._id,setMessages])


  return {loading,messages}
  
}


export default useGetMessages