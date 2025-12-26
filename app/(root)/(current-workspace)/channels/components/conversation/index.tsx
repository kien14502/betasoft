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
import PanelContainer from '../panel/PanelContainer';

type Props = { id: string };

const ConversationContainer = ({ id }: Props) => {
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
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // scroll tracking
  const previousScrollHeight = useRef(0);
  const previousScrollTop = useRef(0);
  const shouldRestoreScroll = useRef(false);

  /* ----------------------------------
   * INIT messages
   * ---------------------------------- */
  useEffect(() => {
    dispatch({
      type: 'INIT',
      payload: conversation?.message || [],
    });
  }, [conversation, dispatch]);

  /* ----------------------------------
   * Infinite scroll (load older msgs)
   * ---------------------------------- */
  useEffect(() => {
    if (!messagesContainerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          const container = messagesContainerRef.current;
          if (!container) return;

          // save scroll state BEFORE fetch
          previousScrollHeight.current = container.scrollHeight;
          previousScrollTop.current = container.scrollTop;
          shouldRestoreScroll.current = true;

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

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  /* ----------------------------------
   * Restore scroll position
   * ---------------------------------- */
  useEffect(() => {
    if (!messagesContainerRef.current || !shouldRestoreScroll.current) return;

    const container = messagesContainerRef.current;
    const newScrollHeight = container.scrollHeight;
    const heightDiff = newScrollHeight - previousScrollHeight.current;

    container.scrollTop = previousScrollTop.current + heightDiff;

    // reset
    shouldRestoreScroll.current = false;
    previousScrollHeight.current = 0;
    previousScrollTop.current = 0;
  }, [state.messages]);

  /* ----------------------------------
   * Scroll to bottom (new msg)
   * ---------------------------------- */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  /* ----------------------------------
   * WebSocket listen
   * ---------------------------------- */
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

  /* ----------------------------------
   * Join / Leave room
   * ---------------------------------- */
  useEffect(() => {
    if (!isConnected) return;

    ws?.send(
      JSON.stringify({
        action: ESocketAction.JOIN_ROOM,
        room: id,
      }),
    );

    return () => {
      ws?.send(
        JSON.stringify({
          action: ESocketAction.LEAVE_ROOM,
          room: id,
        }),
      );
    };
  }, [isConnected, ws, id]);

  /* ----------------------------------
   * Render
   * ---------------------------------- */
  return (
    <>
      <div className="min-h-0 flex flex-col w-full bg-white rounded-4xl border shadow-secondary">
        <HeaderConversation avatar="" name={conversation?.room.name || ''} />

        <div ref={messagesContainerRef} className="overflow-x-hidden py-4 px-6 min-h-0 flex-1">
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

          {groupMessagesByUserWithTime(state.messages).map((group, i) => (
            <Message key={i} messageGroup={group} />
          ))}

          <div ref={messagesEndRef} />
        </div>

        <ConversationController id={id} onBottomMessage={scrollToBottom} />
      </div>
      <PanelContainer id={id} />
    </>
  );
};

export default ConversationContainer;
