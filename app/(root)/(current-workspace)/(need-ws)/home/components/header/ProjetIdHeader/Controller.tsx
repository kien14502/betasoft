'use client';

import { Button } from '@/components/ui/button';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { Ellipsis, MessagesSquare, Users } from 'lucide-react';
import Link from 'next/link';

const Controller = () => {
  const { info } = useAppSelector(getSelector('workspace'));

  return (
    <div className="flex items-center gap-8">
      <Link href={`/channels/dms/${info?.id}`}>
        <Button
          className="border px-2 border-[#F200054D] h-6 font-normal text-primary"
          size={'sm'}
          variant={'ghost'}
        >
          <MessagesSquare color="#F20005" /> Discussion
        </Button>
      </Link>
      <Button size={'sm'} variant={'ghost'} className="font-normal px-2 h-6">
        <Users /> Share
      </Button>
      <Button className="h-6 px-2" variant={'ghost'} size={'icon-sm'}>
        <Ellipsis />
      </Button>
    </div>
  );
};
export default Controller;
