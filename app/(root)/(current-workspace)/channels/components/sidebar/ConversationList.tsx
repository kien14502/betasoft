import { useGetInfiniteConversations } from '@/services/conversation-service';
import { fHmmA } from '@/utils/dayjs';
import Image from 'next/image';
import ConversationListLoading from './ConversationListLoading';
import Link from 'next/link';
import { decodeBase64 } from '@/utils/common';
import { CHAT_TYPE, ROOMS_TYPE } from '@/constants/common';
import EmptyGlobalConversation from '../EmptyGlobalConversation';
import { cn } from '@/lib/utils';
import useConversationSocket from '@/hooks/useConversationSocket';
import { useWS } from '@/hooks/socket-provider';
import { useEffect, useState } from 'react';
import { Room } from '@/interface/conversation';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

type Props = {
  type: CHAT_TYPE;
  id: string;
};

const ConversationList = ({ type, id }: Props) => {
  const isGlobal = type === CHAT_TYPE.GLOBAL;
  const { ws } = useWS();
  const [conversations, setConversations] = useState<Room[]>([]);

  useConversationSocket(ws, (payload) => {
    setConversations([payload, ...conversations]);
  });

  const {
    data: conversationData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetInfiniteConversations({
    is_cross_organization: isGlobal,
    type_of_room: ROOMS_TYPE[type],
  });

  const { targetRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  useEffect(() => {
    setConversations(conversationData || []);
  }, [conversationData]);

  if (isFetching) return <ConversationListLoading />;

  if (type === CHAT_TYPE.GLOBAL && conversations?.length === 0) return <EmptyGlobalConversation />;

  return (
    <div className="flex flex-col gap-2 w-full flex-1 min-h-0">
      {conversations?.map((group) => {
        const isExistLatestMessage = group?.latest_messages;
        return (
          <Link
            href={`/channels/` + group.id}
            key={group.id}
            className={cn(
              'flex py-3 px-4 rounded-2xl hover:bg-blue-1 items-center gap-3',
              id === group.id && 'bg-blue-1',
            )}
          >
            <Image
              width={40}
              height={40}
              className="rounded-xl object-cover"
              src="https://github.com/shadcn.png"
              alt=""
            />

            <div className="flex flex-col gap-1 flex-1 items-start min-w-0">
              <div className="flex items-center justify-between flex-row gap-2 w-full max-w-full">
                <p className="font-semibold text-sm truncate overflow-hidden text-ellipsis">
                  {group.name}
                </p>
                <p className="text-sm text-gray-5">{fHmmA(group.latest_messages.created_at)}</p>
              </div>
              {isExistLatestMessage && (
                <span className="text-sm max-w-full text-gray-5 truncate overflow-hidden text-ellipsis">
                  {decodeBase64(group?.latest_messages.content ?? '')}
                </span>
              )}
            </div>
          </Link>
        );
      })}
      <div ref={targetRef} />
    </div>
  );
};
export default ConversationList;
