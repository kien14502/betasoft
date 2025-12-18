import { InputWithPrefix } from '@/components/common/InputPrefix';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { USER_AVATAR_URL } from '@/constants/common';
import { emailRegex } from '@/constants/regex';
import { User } from '@/interface/auth';
import { cn } from '@/lib/utils';
import { searchUser } from '@/services/auth-service';
import { useMutation } from '@tanstack/react-query';
import { Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  onChange: (ids: string[]) => void;
};

const FindMember = ({ onChange }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => searchUser(1, email),
  });

  const handleSearchUser = () => {
    mutate(email, {
      onSuccess({ users }) {
        if (users.length > 0) {
          const currentUser = users[0];
          setUsers((prev) =>
            prev.some((user) => user.id === currentUser.id) ? prev : [...prev, currentUser],
          );
          setEmail('');
        }
      },
    });
  };

  const handleMoveUser = (id: string) => {
    setUsers((prev) => {
      const user = prev.find((u) => u.id === id);
      if (!user) return prev;

      return prev.filter((u) => u.id !== id);
    });
  };

  useEffect(() => {
    onChange(users.map((user) => user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="font-semibold leading-5">Invite member</Label>
        <InputWithPrefix
          className={cn(
            'h-11 text-sm outline-none rounded-none shadow-popup border-gray-5',
            'focus-visible:ring-offset-0 focus-visible:ring-0',
            'focus-visible:border-2 focus-visible:border-blue-4 transition-all duration-100',
          )}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Enter email..."
        />
      </div>
      <div className="flex w-full items-center gap-1">
        {emailRegex.test(email) ? (
          <Button
            onClick={handleSearchUser}
            type="button"
            className="w-full justify-start"
            size={'sm'}
            variant={'ghost'}
          >
            {isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Image width={20} height={20} src={'/icons/search.svg'} alt="" />
            )}
            Invite <span className="font-semibold">{email}</span>
          </Button>
        ) : (
          <Button type="button" className="w-full justify-start" size={'sm'} variant={'ghost'}>
            <Image width={20} height={20} src={'/icons/email.svg'} alt="" />
            <span className="text-sm text-gray-5">Keep typing full email to invite</span>
          </Button>
        )}
      </div>
      {users.length > 0 && (
        <ScrollArea className="max-h-[300px] overflow-x-hidden">
          <div className="py-2 px-1 flex flex-col gap-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center group gap-2 p-2 rounded-2xl bg-gray-1 shadow border"
              >
                <Image
                  className="rounded-full"
                  width={30}
                  height={30}
                  src={user.profile_image || USER_AVATAR_URL}
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.full_name}</span>
                  <span className="text-xs text-gray-5">{user.email}</span>
                </div>
                <Button
                  onClick={() => handleMoveUser(user.id)}
                  className="ml-auto hidden group-hover:flex"
                  size={'icon-xs'}
                  variant={'outline'}
                  type="button"
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
export default FindMember;
