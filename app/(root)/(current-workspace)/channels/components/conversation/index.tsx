'use client';

import { useContext, useEffect, useRef } from 'react';
import ConversationController from './ConversationController';
import Message from './Message';
import { useInfiniteGetRooms } from '@/services/conversation-service';
import HeaderConversation from './HeaderConversation';
import { Loader2 } from 'lucide-react';
import { ConversationContext } from '../providers/ConversationProviderV2';
import { groupMessagesByUserWithTime } from '@/utils/message';
import { useWS } from '@/hooks/socket-provider';
import { ESocketAction } from '@/constants';
import type { ChatMessage } from '@/interface/conversation';

type Props = { id: string; type: string };

const ConversationContainer = ({ id, type }: Props) => {
  const { state, dispatch } = useContext(ConversationContext);
  const { isConnected, ws } = useWS();
  const {
    data: conversation,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGetRooms(id);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const previousScrollHeight = useRef(0);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const shouldRestoreScroll = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          if (messagesContainerRef.current) {
            previousScrollHeight.current = messagesContainerRef.current.scrollHeight;
            shouldRestoreScroll.current = true;
          }
          fetchNextPage();
        }
      },
      {
        root: messagesContainerRef.current,
        threshold: 0.1,
      },
    );

    if (loadMoreTriggerRef.current) {
      observer.observe(loadMoreTriggerRef.current);
    }

    return () => {
      if (loadMoreTriggerRef.current) {
        observer.unobserve(loadMoreTriggerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    dispatch({ type: 'INIT', payload: conversation?.message || [] });
  }, [conversation, dispatch]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData.action === ESocketAction.NEW_MESSAGE) {
        const message: ChatMessage = receivedData.data;
        dispatch({ type: 'ADD', payload: message });
      }
    };
    ws?.addEventListener('message', handleMessage);
    return () => {
      ws?.removeEventListener('message', handleMessage);
    };
  }, [ws, dispatch]);

  useEffect(() => {
    if (
      messagesContainerRef.current &&
      shouldRestoreScroll.current &&
      previousScrollHeight.current > 0
    ) {
      const newScrollHeight = messagesContainerRef.current.scrollHeight;
      const scrollDifference = newScrollHeight - previousScrollHeight.current;

      // Restore scroll position without animation to keep user's view stable
      messagesContainerRef.current.scrollTop = scrollDifference;

      // Reset tracking variables
      previousScrollHeight.current = 0;
      shouldRestoreScroll.current = false;
    }
    console.log('checked');
  }, [state.messages]); // Depend on messages instead of conversation

  useEffect(() => {
    if (!isConnected) return;
    ws?.send(JSON.stringify({ action: ESocketAction.JOIN_ROOM, room: id }));
    return () => {
      ws?.send(JSON.stringify({ action: ESocketAction.LEAVE_ROOM, room: id }));
    };
  }, [isConnected, ws, id]);

  return (
    <div className="min-h-0 flex flex-col w-full">
      <HeaderConversation avatar={''} name={conversation?.room.name || ''} />
      <div
        ref={messagesContainerRef}
        className="overflow-x-hidden py-4 px-6 min-h-0 flex-1 scroll-smooth"
      >
        {hasNextPage && (
          <div ref={loadMoreTriggerRef} className="flex justify-center py-2">
            {isFetchingNextPage && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="size-4 animate-spin" />
                Loading messages...
              </div>
            )}
          </div>
        )}

        {groupMessagesByUserWithTime(state.messages).map((message, i) => (
          <Message key={i} messageGroup={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ConversationController id={id} onBottomMessage={scrollToBottom} />
    </div>
  );
};

export default ConversationContainer;
