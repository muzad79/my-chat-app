import React, { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3';
import toast from 'react-hot-toast';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages, selectedConversation, incrementUnreadMessages, messages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();

      // Check if the new message is from the currently selected conversation
      if (newMessage.senderId === selectedConversation?._id) {
        setMessages([...messages, newMessage]);
        newMessage.shouldShake = true; // Mark as read
      } else {
        toast.success('You have a new message');
        incrementUnreadMessages(newMessage.senderId); // Increment unread count for other conversations
        newMessage.shouldShake = true;  // Mark as unread
      }
    };

    socket?.on('newMessage', handleNewMessage);

    return () => socket.off('newMessage', handleNewMessage);
  }, [socket, selectedConversation, incrementUnreadMessages, setMessages, messages]);
};

export default useListenMessages;
