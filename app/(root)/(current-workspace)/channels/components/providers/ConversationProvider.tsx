'use client';

import { usePostChatRoomId } from '@/app/api/messages/messages';
import { ESocketAction } from '@/constants';
import { Message } from '@/constants/schemas/task-comment-schema';
import { useWS } from '@/hooks/socket-provider';
import { ChatMessage } from '@/interface/conversation';
import { encodeBase64 } from '@/utils/common';
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
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  removeMessage: (id: string) => void;
  sendMessage: (payload: Message, callback: () => void) => void;
  setMessagesBefore: (payload: ChatMessage[]) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
  roomId: string;
};

export const ConversationProvider: React.FC<Props> = ({ children, roomId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { isConnected, ws } = useWS();
  const { mutate: createMessage } = usePostChatRoomId();

  useEffect(() => {
    if (!isConnected) return;
    ws?.send(
      JSON.stringify({
        action: ESocketAction.JOIN_ROOM,
        room: roomId,
      }),
    );
    return () => {
      ws?.send(
        JSON.stringify({
          action: ESocketAction.LEAVE_ROOM,
          room: roomId,
        }),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData.action === ESocketAction.NEW_MESSAGE) {
        const message: ChatMessage = receivedData.data;
        setMessages((prev) => [...prev, message]);
      }
    };
    ws?.addEventListener('message', handleMessage);
    return () => {
      ws?.removeEventListener('message', handleMessage);
    };
  }, [ws]);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const sendMessage = (values: Message, callback: () => void) => {
    createMessage(
      {
        roomId: roomId,
        data: { content: encodeBase64(values.content), type_content: 1 },
      },
      {
        onSuccess: () => {
          callback();
        },
      },
    );
  };

  const setMessagesBefore = (payload: ChatMessage[]) => {
    setMessages((prev) => [...payload, ...prev]);
  };

  return (
    <ConversationContext.Provider
      value={{
        messages: groupMessagesByUserWithTime(messages),
        addMessage,
        clearMessages,
        removeMessage,
        sendMessage,
        setMessagesBefore,
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
