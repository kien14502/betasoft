'use client';

import { useGetAuthOrganizations } from '@/app/api/organizations/organizations';
import { AuthContext } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

const LaunchApp = () => {
  const router = useRouter();
  const { profile } = useContext(AuthContext);
  const { data } = useGetAuthOrganizations({
    page: 1,
    page_size: 10,
  });

  const workspaces = data?.data;

  const onLaunch = (id: string) => {
    router.push('/' + id);
  };

  return (
    <div className="w-full flex items-start flex-col">
      <span>Workspace for {profile?.full_name}</span>
      <div className="w-full flex flex-col gap-2">
        {workspaces?.organizations?.map((item, i) => (
          <div key={i} className="w-full flex items-center justify-between">
            {item.organization?.name}
            <Button onClick={() => onLaunch(item.organization?.id || '')}>Lanch</Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LaunchApp;
