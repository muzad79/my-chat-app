import create from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],
  unreadMessages: {}, // Object to keep track of unread messages by conversation ID

  setSelectedConversation: (conversation) => set((state) => {
    // Mark all messages as read when a conversation is selected
    if (conversation && state.unreadMessages[conversation._id]) {
      return {
        selectedConversation: conversation,
        unreadMessages: {
          ...state.unreadMessages,
          [conversation._id]: 0, // Reset unread count for this conversation
        },
      };
    }
    return { selectedConversation: conversation };
  }),

  setMessages :(messages)=>set({messages}),

  incrementUnreadMessages: (conversationId) => set((state) => ({
    unreadMessages: {
      ...state.unreadMessages,
      [conversationId]: (state.unreadMessages[conversationId] || 0) + 1,
    },
  })),
}));

export default useConversation;
