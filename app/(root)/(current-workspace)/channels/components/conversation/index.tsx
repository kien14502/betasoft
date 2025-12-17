'use client';

import { useContext, useEffect, useRef } from 'react';
import ConversationController from './ConversationController';
import Message from './Message';
import { useInfiniteGetRooms } from '@/services/conversation-service';
import HeaderConversation from './HeaderConversation';
import { useConversationLoadMore } from '@/hooks/useConversationLoadMore';
import { Loader2 } from 'lucide-react';
import { CHAT_TYPE } from '@/constants/common';
import { ConversationContext } from '../providers/ConversationProviderV2';
import { groupMessagesByUserWithTime } from '@/utils/message';
import { useWS } from '@/hooks/socket-provider';
import { ESocketAction } from '@/constants';
import { ChatMessage } from '@/interface/conversation';

type Props = { id: string; type: string };

const ConversationContainer = ({ id, type }: Props) => {
  const { state, dispatch } = useContext(ConversationContext);
  const { isConnected, ws } = useWS();
  const { data: conversation, fetchNextPage, hasNextPage, isFetching } = useInfiniteGetRooms(id);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const { containerRef } = useConversationLoadMore({
    onLoadMore: fetchNextPage,
    hasMore: hasNextPage,
    threshold: 10,
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    dispatch({ type: 'INIT', payload: conversation?.message || [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  useEffect(() => {
    if (!isConnected) return;
    ws?.send(JSON.stringify({ action: ESocketAction.JOIN_ROOM, room: id }));
    return () => {
      ws?.send(JSON.stringify({ action: ESocketAction.LEAVE_ROOM, room: id }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    const heightMessage = messageRef.current?.offsetHeight ?? 0;
    const heightContainer = containerRef.current?.offsetHeight ?? 0;
    if (heightMessage < heightContainer && hasNextPage) {
      fetchNextPage();
      scrollToBottom();
    }
  }, [containerRef, fetchNextPage, hasNextPage]);

  return (
    <div className="min-h-0 flex flex-col w-full">
      <HeaderConversation avatar={''} name={conversation?.room.name || ''} />
      <div ref={containerRef} className="overflow-x-hidden py-4 px-6 min-h-0 flex-1 scroll-smooth">
        {/* <div ref={targetRef} /> */}
        {isFetching && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Loading older messages...</span>
          </div>
        )}

        <div ref={messageRef} className="flex flex-col gap-2 h-fit items-end">
          {groupMessagesByUserWithTime(state.messages).map((message, i) => (
            <Message key={i} messageGroup={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ConversationController id={id} onBottomMessage={scrollToBottom} />
    </div>
  );
};

export default ConversationContainer;
