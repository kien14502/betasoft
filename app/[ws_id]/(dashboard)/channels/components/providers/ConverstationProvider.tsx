'use client';

import { ESocketAction } from '@/constants';
import { useWS } from '@/hooks/socket-provider';
import { MessageData } from '@/interface/web-socket';
import { GroupedMessage, groupMessagesByUserWithTime } from '@/utils/message';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';

interface ConversationContextType {
  messages: GroupedMessage[];
  addMessage: (message: MessageData) => void;
  clearMessages: () => void;
  removeMessage: (id: string) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
  roomId: string;
};

export const ConversationProvider: React.FC<Props> = ({ children, roomId }) => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const { isConnected, ws } = useWS();

  useEffect(() => {
    if (!isConnected) return;
    ws?.send(
      JSON.stringify({
        action: ESocketAction.JOIN_ROOM,
        room: '69242a25e4c7b711b675fb72',
      }),
    );
    return () => {
      ws?.send(
        JSON.stringify({
          action: ESocketAction.LEAVE_ROOM,
          room: '69242a25e4c7b711b675fb72',
        }),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData.action === ESocketAction.NEW_MESSAGE) {
        const message: MessageData = receivedData.data;
        setMessages((prev) => [...prev, message]);
      }
    };
    ws?.addEventListener('message', handleMessage);
    return () => {
      ws?.removeEventListener('message', handleMessage);
    };
  }, [ws]);

  const addMessage = useCallback((message: MessageData) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return (
    <ConversationContext.Provider
      value={{
        messages: groupMessagesByUserWithTime(messages),
        addMessage,
        clearMessages,
        removeMessage,
      }}
    >
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
