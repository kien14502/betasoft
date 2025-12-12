import { Button } from '@/components/ui/button';
import { USER_AVATAR_URL } from '@/constants/common';
import { User } from '@/interface/auth';
import Image from 'next/image';

type Props = {
  user: User;
};

const UserChatView = ({ user }: Props) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-end gap-32">
      <div className="flex items-center justify-center flex-col gap-3">
        <Image
          className="rounded-full object-center"
          width={120}
          height={120}
          src={user.profile_image || USER_AVATAR_URL}
          alt=""
        />
        <div className="flex items-center justify-center flex-col">
          <p className="font-semibold">{user.full_name}</p>
          <span className="text-gray-4 text-sm">{user.email}</span>
        </div>
      </div>
      <Button size={'xl'} variant={'active'}>
        Chat now{' '}
        <Image className="rotate-45" width={28} height={28} src={'/icons/send-white.svg'} alt="" />
      </Button>
    </div>
  );
};
export default UserChatView;
