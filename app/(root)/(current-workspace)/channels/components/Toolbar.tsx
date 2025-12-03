'use client';

import { InputWithPrefix } from '@/components/common/InputPrefix';
import { Button } from '@/components/ui/button';
import { Funnel, Search, SquarePen } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import dynamic from 'next/dynamic';

const CreateNewConversation = dynamic(() => import('./dialogs/CreateNewConversation'), {
  loading: () => <div>loading</div>,
});

const Toolbar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="p-2 pt-4 flex items-center gap-1">
      <InputWithPrefix
        prefix={<Search size={20} />}
        placeholder="Search"
        className="flex-1 w-full!"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={'icon'} variant={'ghost'}>
            <Funnel />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Filter</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={() => setOpenModal(!openModal)} size={'icon'} variant={'ghost'}>
            <SquarePen />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create new conversation</p>
        </TooltipContent>
      </Tooltip>
      <CreateNewConversation open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

export default Toolbar;
