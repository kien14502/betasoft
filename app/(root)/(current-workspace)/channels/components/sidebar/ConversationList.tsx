import { useGetRooms } from '@/services/conversation-service';
import { fHmmA } from '@/utils/dayjs';
import Image from 'next/image';
import ConversationListLoading from './ConversationListLoading';
import Link from 'next/link';
import { decodeBase64 } from '@/utils/common';
import { CHAT_TYPE, ROOMS_TYPE } from '@/constants/common';
import EmptyGlobalConversation from '../EmptyGlobalConversation';
import { cn } from '@/lib/utils';

type Props = {
  type: CHAT_TYPE;
  current_id: string;
};

const ConversationList = ({ type, current_id }: Props) => {
  const isGlobal = type === CHAT_TYPE.GLOBAL;
  const { data: groups, isPending } = useGetRooms(
    { page: 1, page_size: 10 },
    {
      is_cross_organization: isGlobal,
      type_of_room: ROOMS_TYPE[type],
    },
  );

  if (isPending) return <ConversationListLoading />;

  if (type === CHAT_TYPE.GLOBAL && groups?.length === 0) return <EmptyGlobalConversation />;

  return (
    <div className="flex flex-col gap-2 w-full flex-1 min-h-0">
      {groups?.map((group) => {
        const isExistLastestMessage = group?.latest_messages;

        return (
          <Link
            href={`/channels/${type}/` + group.id}
            key={group.id}
            className={cn(
              'flex py-3 px-4 rounded-2xl hover:bg-blue-1 items-center gap-3',
              'flex py-3 px-4 rounded-2xl hover:bg-blue-1 items-center gap-3',
              current_id === group.id && 'bg-blue-1',
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
              {isExistLastestMessage && (
                <span className="text-sm max-w-full text-gray-5 truncate overflow-hidden text-ellipsis">
                  {decodeBase64(group?.latest_messages.content ?? '')}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ConversationList;
