import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ButtonTooltip } from '../ButtonTooltip';
import { UserCircle } from 'lucide-react';
import { User } from '@/interface/auth';
import Image from 'next/image';
import { USER_AVATAR_URL } from '@/constants/common';
import { useEffect, useState } from 'react';

type Props = {
  users: User[];
  onChange: (value: string) => void;
};

const AssigneeSelect = ({ users, onChange }: Props) => {
  const [userSelected, setUserSelected] = useState<User | null>(null);

  useEffect(() => {
    if (!userSelected) return;
    onChange(userSelected?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelected]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonTooltip content="Assignee" variant={'outline'} size={'icon-xs'}>
          {userSelected ? (
            <>
              <Image
                width={20}
                height={20}
                src={userSelected.profile_image || USER_AVATAR_URL}
                alt=""
              />
            </>
          ) : (
            <UserCircle />
          )}
        </ButtonTooltip>
      </PopoverTrigger>
      <PopoverContent>
        {users.map((user) => (
          <div
            onClick={() => setUserSelected(user)}
            key={user.id}
            className="text-sm font-medium flex items-center gap-1"
          >
            <Image width={24} height={24} src={user.profile_image || USER_AVATAR_URL} alt="" />
            {user.full_name}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
export default AssigneeSelect;
