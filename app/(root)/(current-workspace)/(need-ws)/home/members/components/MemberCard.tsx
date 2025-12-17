import { USER_AVATAR_URL } from '@/constants/common';
import { User } from '@/interface/auth';
import Image from 'next/image';

type Props = {
  user: User;
};

const MemberCard = ({ user }: Props) => {
  return (
    <div className="flex items-center flex-col w-fit">
      <div className="rounded-full relative overflow-hidden w-[136px] h-[136px] border-8 border-blue-1">
        <Image
          objectFit="contain"
          layout="fill"
          src={user.profile_image || USER_AVATAR_URL}
          alt=""
        />
      </div>
      <p className="font-semibold">{user.full_name}</p>
      <p className="text-xs text-gray-4">{user.email}</p>
    </div>
  );
};
export default MemberCard;
