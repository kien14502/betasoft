import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { USER_AVATAR_URL } from '@/constants/common';
import { getSelector, useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { logout } from '@/lib/features/auth/authSlice';
import { removeAuthStorage } from '@/utils/authStorage';
import { clearClientCookies } from '@/utils/cookie.client';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

const UserPanel = () => {
  const { user: profile } = useAppSelector(getSelector('auth'));
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onLogout = () => {
    dispatch(logout());
    removeAuthStorage('ACCESS_TOKEN');
    clearClientCookies();
    router.push('/login');
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          width={40}
          height={40}
          className="rounded-full object-center"
          src={profile?.profile_image || USER_AVATAR_URL}
          alt=""
        />
      </PopoverTrigger>
      <PopoverContent className="p-0" side="right" align="end">
        <div className="flex items-center gap-2 border-b p-4">
          <Image
            width={35}
            height={35}
            className="rounded-full object-center"
            src={profile?.profile_image || USER_AVATAR_URL}
            alt=""
          />
          <div className="flex flex-col">
            <p className="font-medium">{profile?.full_name}</p>
            <p className="text-sm text-gray-4">{profile?.email}</p>
          </div>
        </div>
        <div className="p-4 flex">
          <Button className="w-full justify-start" onClick={onLogout} variant={'ghost'}>
            <LogOut /> Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default memo(UserPanel);
