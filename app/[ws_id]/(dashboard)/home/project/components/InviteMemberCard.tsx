import { ResponseOrgMember } from '@/app/api/generated.schemas';
import { CheckboxRound } from '@/components/common/CheckboxRound';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { USER_AVATAR_URL } from '@/constants/common';

type Props = {
  member: ResponseOrgMember;
  onChange: (member: ResponseOrgMember) => void;
  checked: boolean;
};

const InviteMemberCard: React.FC<Props> = ({ member, onChange, checked }) => {
  return (
    <div
      onClick={() => onChange(member)}
      className="flex items-center py-2 px-3 justify-start hover:bg-[#F2F2F7]"
    >
      <CheckboxRound checked={checked} onChange={() => onChange(member)} />
      <Avatar className="ml-4">
        <AvatarImage src={member.profile_image || USER_AVATAR_URL} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="ml-3 text-sm font-medium">{member.full_name}</span>
    </div>
  );
};
export default InviteMemberCard;
