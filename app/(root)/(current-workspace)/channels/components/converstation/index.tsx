'use client';

import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useConversation } from '../providers/ConverstationProvider';
import ConversationController from './ConversationController';
import HeaderConverstation from './HeaderConverstation';
import Message from './Message';
import { useGetRoom } from '@/services/conversation-service';

type Props = { id: string };

const ConversationContainer = ({ id }: Props) => {
  const { messages } = useConversation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data } = useGetRoom(id, { page: 1, page_size: 10 });

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
      <HeaderConverstation avatar={''} name={data?.room.name || ''} />
      <ScrollArea className="overflow-x-hidden py-4 px-6 min-h-0 flex-1">
        <div className="flex flex-col gap-2">
          {messages.map((message, i) => (
            <Message key={i} messageGroup={message} />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>
      <ConversationController />
    </div>
  );
};

export default ConversationContainer;
