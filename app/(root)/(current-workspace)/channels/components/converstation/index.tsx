'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useConversation } from '../providers/ConversationProvider';
import ConversationController from './ConversationController';
import Message from './Message';
import { useGetRoom } from '@/services/conversation-service';
import HeaderConversation from './HeaderConversation';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

type Props = { id: string };

const ConversationContainer = ({ id }: Props) => {
  const { messages, setMessagesBefore } = useConversation();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetRoom(id, { page, page_size: 10 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { targetRef } = useInfiniteScroll({
    hasMore: (data?.message?.length ?? 0) === 10,
    loading: isFetching,
    onLoadMore: () => setPage((p) => p + 1),
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setMessagesBefore(data?.message || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-0 flex flex-col w-full">
      <HeaderConversation avatar={''} name={data?.room.name || ''} />
      <ScrollArea className="overflow-x-hidden py-4 px-6 min-h-0 flex-1">
        <div ref={targetRef} />
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
