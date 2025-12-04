import { USER_AVATAR_URL } from '@/constants/common';
import { cn } from '@/lib/utils';
import { decodeBase64 } from '@/utils/common';
import { fDateAtTime, over5MinutesNow } from '@/utils/dayjs';
import { GroupedMessage } from '@/utils/message';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getSelector, useAppSelector } from '@/hooks/useRedux';

type Props = {
  messageGroup: GroupedMessage;
};

const Message = ({ messageGroup }: Props) => {
  const { user: profile } = useAppSelector(getSelector('auth'));

  const isMe = messageGroup.user.id === profile?.id;

  return (
    <>
      <div className={cn('flex items-end gap-3', isMe ? 'flex-row-reverse' : 'flex-row')}>
        {!isMe && (
          <Tooltip>
            <TooltipTrigger>
              <Image
                className="rounded-[8px] object-cover"
                width={24}
                height={24}
                src={messageGroup.user.profile_image || USER_AVATAR_URL}
                alt=""
              />
            </TooltipTrigger>
            <TooltipContent>{messageGroup.user.full_name}</TooltipContent>
          </Tooltip>
        )}
        <div className="flex flex-col gap-1">
          {messageGroup.messages.map((message) => (
            <Tooltip key={message.id}>
              <TooltipTrigger>
                <div
                  className={cn(
                    'flex rounded-2xl flex-col gap-1 w-fit max-w-(--message-width) p-3',
                    isMe
                      ? 'bg-blue-1 hover:bg-blue-2 ml-auto'
                      : 'bg-gray-1 mr-auto hover:bg-gray-2',
                    isMe ? 'rounded-br' : 'rounded-bl',
                  )}
                >
                  <span className="text-sm text-[#131315] wrap-break-word font-medium">
                    {decodeBase64(message.content)}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent
                className="bg-white shadow-secondary h-[27px] [&_svg]:border [&_svg]:border-blue-2 [&_svg]:bg-white [&_svg]:fill-white border border-blue-2"
                side={isMe ? 'right' : 'left'}
              >
                <span className={cn('text-xs font-medium text-black text-end')}>
                  {fDateAtTime(message.created_at)}
                </span>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
      {over5MinutesNow(messageGroup.firstMessageTime) && (
        <div className="py-4 text-xs text-center text-gray-4">
          {fDateAtTime(messageGroup.firstMessageTime)}
        </div>
      )}
    </>
  );
};
export default Message;
