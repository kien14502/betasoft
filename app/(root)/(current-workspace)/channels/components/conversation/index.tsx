'use client';

import React, { useEffect, useRef } from 'react';
import { useConversation } from '../providers/ConversationProvider';
import ConversationController from './ConversationController';
import Message from './Message';
import { useInfiniteGetRooms } from '@/services/conversation-service';
import HeaderConversation from './HeaderConversation';
import { useConversationLoadMore } from '@/hooks/useConversationLoadMore';
import { Loader2 } from 'lucide-react';
import { CHAT_TYPE } from '@/constants/common';

type Props = { id: string; type: string };

const ConversationContainer = ({ id, type }: Props) => {
  const { messages, setMessagesBefore } = useConversation();
  const isGlobal = type === CHAT_TYPE.GLOBAL;

  const {
    data: conversation,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGetRooms(id);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { containerRef, isLoading, isNearTop } = useConversationLoadMore({
    onLoadMore: fetchNextPage,
    hasMore: hasNextPage,
    threshold: 1000,
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setMessagesBefore(conversation?.message || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-0 flex flex-col w-full">
      <HeaderConversation avatar={''} name={conversation?.room.name || ''} />
      <div ref={containerRef} className="overflow-x-hidden py-4 px-6 min-h-0 flex-1 scroll-smooth">
        {/* <div ref={targetRef} /> */}
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Loading older messages...</span>
          </div>
        )}

        <div className="flex flex-col gap-2 mt-auto h-full items-end">
          {messages.map((message, i) => (
            <Message key={i} messageGroup={message} />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <ConversationController />
    </div>
  );
};

export default ConversationContainer;
