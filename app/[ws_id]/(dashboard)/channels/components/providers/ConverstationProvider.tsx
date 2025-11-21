'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

interface ConversationContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  removeMessage: (id: string) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return (
    <ConversationContext.Provider value={{ messages, addMessage, clearMessages, removeMessage }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversation must be used within ConversationProvider');
  }
  return context;
};
