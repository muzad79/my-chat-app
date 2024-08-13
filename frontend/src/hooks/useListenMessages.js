import React, { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3';
import toast from 'react-hot-toast';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation, incrementUnreadMessages } = useConversation();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();

      if (newMessage.senderId !== selectedConversation?._id) {
        toast.success('You have a new message');
        newMessage.shouldShake = true;  // Mark as unread
        incrementUnreadMessages(newMessage.senderId); // Increment unread count
      } else {
        newMessage.shouldShake = false; // Mark as read
      }

      if(newMessage.senderId === selectedConversation._id)
        setMessages([...messages,newMessage])
    });

    return () => socket.off('newMessage');
  }, [socket, setMessages, selectedConversation, incrementUnreadMessages]);
};

export default useListenMessages;
