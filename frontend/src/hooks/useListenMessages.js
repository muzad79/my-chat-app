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

      // Check if the new message is from the currently selected conversation
      if (newMessage.senderId === selectedConversation?._id) {
        setMessages( [...messages, newMessage]);
        newMessage.shouldShake = false; // Mark as read
      } else {
        toast.success('You have a new message');
        incrementUnreadMessages(newMessage.senderId); // Increment unread count for other conversations
        newMessage.shouldShake = true;  // Mark as unread
      }
    });

    return () => socket.off('newMessage');
  }, [socket, selectedConversation, incrementUnreadMessages, setMessages]);
};

export default useListenMessages;
