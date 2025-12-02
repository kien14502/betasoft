'use client';

import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import StackImages from '@/components/common/StackImages';
import { useConversation } from '../providers/ConverstationProvider';
import ConversationController from './ConversationController';
import HeaderConverstation from './HeaderConverstation';
import Message from './Message';

const ConversationContainer = () => {
  const { messages } = useConversation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-0 flex flex-col w-full">
      <HeaderConverstation avatar={'123'} name="123" />
      <ScrollArea className="overflow-x-hidden py-4 px-6 min-h-0 flex-1">
        <div className="flex flex-col gap-2">
          {messages.map((message, i) => (
            <Message key={i} messageGroup={message} />
          ))}
        </div>
        <StackImages
          images={['/images/create-work.png', '/images/create-ws.png', '/images/join-chat.png']}
        />
        <div ref={messagesEndRef} />
      </ScrollArea>
      <ConversationController />
    </div>
  );
};

export default ConversationContainer;
