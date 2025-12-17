'use client';

import { useGetMemberWorkspace } from '@/services/workspace-service';
// import InviteMember from './components/InviteMember';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import MemberCard from './components/MemberCard';

const MembersPage = () => {
  const { info } = useAppSelector(getSelector('workspace'));
  // OPTIMIZE
  const { data, isFetching } = useGetMemberWorkspace(info?.id ?? '');

  return (
    <div className="min-h-0 flex-1 bg-white shadow-secondary rounded-4xl p-8">
      {!data && isFetching && <div>Loading....</div>}
      {data && (
        <div>
          {data.map((item) => (
            <MemberCard key={item.id} user={item} />
          ))}
        </div>
      )}
    </div>
  );
};
export default MembersPage;
