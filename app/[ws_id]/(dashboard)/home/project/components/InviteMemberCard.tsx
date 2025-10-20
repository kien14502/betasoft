import { ResponseOrgMember } from '@/app/api/generated.schemas';
import { CheckboxRound } from '@/components/common/CheckboxRound';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

type Props = {
  member: ResponseOrgMember;
  onChange: (member: ResponseOrgMember) => void;
  checked: boolean;
};

const InviteMemberCard: React.FC<Props> = ({ member, onChange, checked }) => {
  return (
    <div
      onClick={() => onChange(member)}
      className="flex items-center !py-2 !px-3 justify-start hover:bg-[#F2F2F7]"
    >
      <CheckboxRound checked={checked} onChange={() => onChange(member)} />
      <Avatar className="!ml-4" src={member.profile_image} size={32} icon={<UserOutlined />} />
      <span className="!ml-3">{member.full_name}</span>
    </div>
  );
};
export default InviteMemberCard;
