import { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';

type Props = {
  name: string;
  avatar: string | string[];
};

const HeaderConverstation = ({ avatar, name }: Props) => {
  return (
    <div className="py-4 px-6 border-b-4 flex items-center gap-2">
      {typeof avatar === 'string' ? (
        <Avatar>
          <AvatarImage width={24} height={24} src={avatar} />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      ) : (
        <div></div>
      )}
      <span className="font-semibold">{name}</span>
      <Button className="ml-auto" variant={'ghost'} size={'icon-sm'}>
        <Ellipsis />
      </Button>
    </div>
  );
};
export default memo(HeaderConverstation);
