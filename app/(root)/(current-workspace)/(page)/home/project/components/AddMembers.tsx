import { useGetAuthOrganizationsOrgIdMembers } from '@/app/api/organizations/organizations';
import { useDebounce } from '@/hooks/useDebounce';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import InviteMemberCard from './InviteMemberCard';
import { ResponseOrgMember } from '@/app/api/generated.schemas';
import MemberSelected from './MemberSelected';
import { detectStartCharMembers } from '@/utils/common';
import { Loader, Plus } from 'lucide-react';

type Props = {
  onChangeMemberSeleted: (members: ResponseOrgMember[]) => void;
  idWs: string;
  memberCount: number;
};

const AddMembers: React.FC<Props> = ({ onChangeMemberSeleted, idWs, memberCount }) => {
  const [search, setSearch] = useState<string>('');
  const [membersSelected, setMembersSelected] = useState<ResponseOrgMember[]>([]);
  const debouncedSearchTerm = useDebounce(search, 500);

  // Query members với debounced search term
  const { data, isLoading } = useGetAuthOrganizationsOrgIdMembers(
    idWs,
    {
      name: debouncedSearchTerm,
      page: 1,
      page_size: 10,
    },
    {
      query: {
        enabled: debouncedSearchTerm.trim() !== '',
      },
    },
  );

  const members = data?.data?.members;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  useEffect(() => {
    onChangeMemberSeleted(membersSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membersSelected]);

  const handleSelectMember = (member: ResponseOrgMember) => {
    setMembersSelected((prev) => {
      const isSelected = prev.find((item) => item.id === member.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== member.id);
      } else {
        return [...prev, member];
      }
    });
  };

  const isChecked = (member: ResponseOrgMember): boolean => {
    return !membersSelected.find((item) => item.id === member.id);
  };

  return (
    <div className="flex gap-6 flex-col h-full">
      <div className="flex items-center border border-[#AEAEB2] shadow-btn h-12 gap-2 !p-3">
        <Image src={'/icons/search.svg'} height={24} width={24} alt={''} />
        <input value={search} onChange={onChange} className="outline-none flex-1" type="text" />
        {!isLoading ? (
          <Plus style={{ fontSize: '24px' }} />
        ) : (
          <Loader className="animate-spin" style={{ fontSize: '24px' }} />
        )}
      </div>
      <div className="flex flex-1 gap-6">
        <div className="flex-1">
          {detectStartCharMembers(members ?? [])?.map((item) => (
            <div key={item.startChar}>
              <div className="font-semibold mb-2">{item.startChar}</div>
              {item.members.map((_item) => (
                <InviteMemberCard
                  checked={isChecked(_item)}
                  key={_item.id}
                  member={_item}
                  onChange={handleSelectMember}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="max-w-[272px] w-full border border-[#D1D1D6] h-full p-4 rounded-[8px]">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-semibold">Selected</span>
            <div className="bg-[#E5F1FF] font-medium text-[#002E73] rounded-[8px] py-1.5 px-3">
              {membersSelected.length}/{memberCount}
            </div>
          </div>
          {membersSelected.map((item) => (
            <MemberSelected onRemove={handleSelectMember} key={item.id} member={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default AddMembers;
