import { Button } from '@/components/ui/button';
import { Ellipsis, MessagesSquare, Users } from 'lucide-react';
import Link from 'next/link';

const Controller = () => {
  return (
    <div className="flex items-center gap-8">
      <Link href={'!@3'}>
        <Button
          className="border px-2 border-[#F200054D] h-6 font-normal"
          size={'sm'}
          variant={'ghost'}
        >
          <MessagesSquare color="#F20005" /> Discusstion
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
