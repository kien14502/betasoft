'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { USER_AVATAR_URL } from '@/constants/common';
import Link from 'next/link';
import { getSelector, useAppSelector } from '@/hooks/useRedux';

const WorkspaceSelector = () => {
  const { items } = useAppSelector(getSelector('listWorkspace'));
  const { info } = useAppSelector(getSelector('workspace'));

  if (items.length === 0) return null;

  return (
    <Popover>
      <PopoverTrigger className="shadow-secondary gap-2 shrink-0 flex items-center rounded-xl py-2 bg-white border text-sm px-3">
        <Image
          className="rounded-md object-center"
          width={24}
          height={24}
          src={info?.avatar || USER_AVATAR_URL}
          alt=""
        />
        {info?.name || 'Select workspace'}
        <ChevronDown className="text-gray-5" size={16} />
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 max-h-[300px] overflow-x-auto rounded-none py-2">
        {items.map((ws) => (
          <Link
            href={ws?.organization.id || ''}
            className="flex items-center py-2 relative px-3 group cursor-pointer gap-2 text-sm"
            key={ws?.organization.id || ''}
          >
            <Image
              className="rounded-md object-center"
              width={24}
              height={24}
              src={ws?.organization.avatar || USER_AVATAR_URL}
              alt=""
            />
            {ws?.organization.name}
            <div className="absolute top-0 left-0 w-0.5 h-full bg-blue-4 hidden group-hover:block" />
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default WorkspaceSelector;
