import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
    const{sendMessage,loading}=useSendMessage()
  const [message,setMessage] = useState("")
  const handleSubmit = async(e)=>{

    e.preventDefault()
    if(!message)return
    await sendMessage(message)
    setMessage("")




  }
  return (
    <div>
      <form className="px-4 my-3 " onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Send a message"
            className="border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 text-white"
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
          />

          <button
            className="absolute inset-y-0 end-0 flex items-center pe-3"
            type="submit"
          >
            {loading?<span className="loading loading-spinner"></span>:<BiSend />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
