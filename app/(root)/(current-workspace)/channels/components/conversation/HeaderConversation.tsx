import { memo, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Ellipsis, PanelLeft, Search } from 'lucide-react';
import Image from 'next/image';
import { USER_AVATAR_URL } from '@/constants/common';
import { PanelContext } from '../providers/PanelProvider';

type Props = {
  name: string;
  avatar: string | string[];
};

const HeaderConversation = ({ avatar, name }: Props) => {
  const { onOpen } = useContext(PanelContext);
  return (
    <div className="py-4 px-6 border-b-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        {typeof avatar === 'string' ? (
          <Image
            className="rounded-xl object-center w-10 h-10 shrink-0"
            width={40}
            height={40}
            src={avatar || USER_AVATAR_URL}
            alt=""
          />
        ) : (
          <div></div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">{name}</span>
          <span className="text-xs text-[#07AE0F]">Online</span>
        </div>
      </div>
      <div>
        <Button className="ml-auto" variant={'ghost'} size={'icon-sm'}>
          <Search />
        </Button>
        <Button
          onClick={() => onOpen('INFO')}
          className="ml-auto"
          variant={'ghost'}
          size={'icon-sm'}
        >
          <PanelLeft />
        </Button>
        <Button className="ml-auto" variant={'ghost'} size={'icon-sm'}>
          <Ellipsis className="rotate-90" />
        </Button>
      </div>
    </div>
  );
};
export default memo(HeaderConversation);
