'use client';

import { useGetAuthProjectsMyProjectsOrgId } from '@/app/api/project/project';
import { memo, useContext, useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { USER_AVATAR_URL } from '@/constants/common';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { mergeUrl } from '@/lib/utils';

const ProjectSelector = () => {
  const { info } = useAppSelector(getSelector('workspace'));
  const workspaceId = info?.id;
  const { project } = useContext(ProjectContext);

  const shouldFetchProjects = Boolean(workspaceId);

  const { data, isPending } = useGetAuthProjectsMyProjectsOrgId(
    workspaceId ?? '',
    {
      page: 1,
      page_size: 10,
      is_team: false,
    },
    {
      query: {
        enabled: shouldFetchProjects,
        select: (response) => response.data,
      },
    },
  );

  const currentPrj = useMemo(() => {
    const rs = data?.projects?.find((item) => item.project?.id === project?.project?.id);
    return rs;
  }, [data?.projects, project?.project?.id]);

  if (!shouldFetchProjects || isPending) {
    return <Skeleton className="h-10 w-40" />;
  }

  return (
    <>
      <div className="text-sm flex items-center">
        <Link className="text-[#787878]" href={'/' + ['home', 'project'].join('/')}>
          PROJECTS
        </Link>
        <p className="font-medium uppercase"> / {project?.project?.name}</p>
      </div>
      <Popover>
        <PopoverTrigger className="flex items-center gap-2">
          <span className="text-[#0045AC] text-2xl font-medium">{currentPrj?.project?.name}</span>

          <ChevronDown size={24} />
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0 py-2 flex flex-col">
          {data?.projects?.map((prj) => (
            <Link
              className="py-2 px-3 flex items-center gap-2 hover:bg-gray-2"
              href={mergeUrl(['home/project', prj.project?.id || ''])}
              key={prj.project?.id}
            >
              <Image
                className="object-cover"
                width={30}
                height={30}
                src={prj.project?.avatar || USER_AVATAR_URL}
                alt=""
              />
              {prj.project?.name}
            </Link>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default memo(ProjectSelector);
