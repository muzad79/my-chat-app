import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const { sendMessage, loading } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div>
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="flex items-center w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg">
          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 bg-gray-700 text-sm text-white focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="ml-2 text-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <BiSend />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
