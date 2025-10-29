import { ResponseOrgMember } from '@/app/api/generated.schemas';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type Props = {
  member: ResponseOrgMember;
  onRemove: (member: ResponseOrgMember) => void;
};

const MemberSelected: React.FC<Props> = ({ member, onRemove }) => {
  return (
    <div className="flex bg-[#E5F1FF] p-2 items-center rounded-3xl">
      <Image
        className="object-center rounded-full"
        width={32}
        height={32}
        src={member.profile_image ?? ''}
        alt={''}
      />
      <span className="ml-3 text-[#002E73] text-sm font-medium">{member.full_name}</span>
      <Button
        size={'icon'}
        variant={'link'}
        onClick={() => onRemove(member)}
        className="ml-auto p-1!"
      >
        <Image src={'/icons/close-circle.svg'} width={24} height={24} alt={''} />
      </Button>
    </div>
  );
};
export default MemberSelected;
