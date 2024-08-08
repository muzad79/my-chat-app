import axios from 'axios'
import React, { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useSendMessage = () => {
const [loading,setLoading] = useState(false)
const {messages,setMessages,selectedConversation}=  useConversation()

const sendMessage = async(message)=>{
        setLoading(true)
    try{
        const res = await axios.post(`http://localhost:4000/api/message/send/${selectedConversation?._id}`,{message})

        if( res.status !== 201){

            throw new Error(res?.data?.error)
        }
      setMessages([...messages,res?.data])

    }
    catch(error){
        toast.error(error.message)

    }
    finally{
        setLoading(false)
    }

}

return {loading,sendMessage}
}

export default useSendMessage