'use client';

import SearchExpanded from './SearchExpanded';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import CreateConversation from './CreateConversation';
import { CHAT_TYPE } from '@/constants/common';

type Props = {
  key_chat: CHAT_TYPE;
};

const HeaderChannel = ({ key_chat }: Props) => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  return (
    <div className="fixed top-0 flex items-center w-full justify-between py-4 max-w-(--header-channel-width)">
      {!isOpenSearch && <p className={cn('text-[32px] font-medium')}>Chat box</p>}
      <div className="flex items-center gap-1 ml-auto flex-1 justify-end">
        <SearchExpanded isOpen={isOpenSearch} setIsOpen={setIsOpenSearch} />
        <CreateConversation key_chat={key_chat} />
      </div>
    </div>
  );
};
export default HeaderChannel;
