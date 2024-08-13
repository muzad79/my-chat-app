import React from 'react';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const { onlineUsers } = useSocketContext();
  const { selectedConversation, setSelectedConversation, unreadMessages } = useConversation();
  const isSelected = selectedConversation?._id === conversation?._id;

  // Check if there is any unread message from the current conversation
  const unreadCount = unreadMessages[conversation._id] || 0;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? 'bg-sky-500' : ''}`}
        onClick={() => {
          setSelectedConversation(conversation);
        }}
      >
        <div className={`avatar relative ${onlineUsers?.includes(conversation._id) ? 'online' : ''}`}>
          <div className='w-12 rounded-full'>
            <img src={conversation.profilePic} alt='user image' />
          </div>
          {/* Badge */}
          {unreadCount > 0 && (
            <span className="badge badge-xs badge-primary absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
              {unreadCount}
            </span>
          )}
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{conversation?.fullname}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-0 py-0 h-1'></div>}
    </>
  );
};

export default Conversation;
