'use client';

import { ResponseMembersWithProjectMemberRole } from '@/app/api/generated.schemas';
import { useGetAuthProjectsProjectIdMembers } from '@/app/api/project/project';
import { createContext, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  id: string;
};

type MembersProjectContext = {
  members: ResponseMembersWithProjectMemberRole[];
  total: number;
  isPending: boolean;
};

const initContext: MembersProjectContext = {
  members: [],
  total: 0,
  isPending: false,
};

export const MembersProjectContext = createContext<MembersProjectContext>(initContext);

const MemberProjectProvider: React.FC<Props> = ({ children, id }) => {
  const { data: membersData, isPending } = useGetAuthProjectsProjectIdMembers(id, {
    page: 1,
    page_size: 10,
  });

  const members = membersData?.data?.members ?? [];
  const total = membersData?.data?.total ?? 0;

  return (
    <MembersProjectContext.Provider value={{ members, total, isPending }}>
      {children}
    </MembersProjectContext.Provider>
  );
};
export default MemberProjectProvider;
