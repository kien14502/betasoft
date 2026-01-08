'use client';

import EmptyProjectView from './components/EmptyProjectView';
import ProjectCard from './components/ProjectCard';
import { groupRoleProjects } from '@/utils/common';
import ProjectWrapper from './components/ProjectWrapper';
import ProjectHeader from '../components/header/ProjectHeader';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useInfiniteProjects } from '@/services/workspace-service';
import { Skeleton } from '@/components/ui/skeleton';

const ProjectPage = () => {
  const { info } = useAppSelector(getSelector('workspace'));
  const workspaceId = info?.id;
  const {
    data: projects,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProjects(workspaceId);

  const { targetRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const { adminProjects, otherProjects } = groupRoleProjects(projects || []);

  if (!projects && isFetchingNextPage) {
    return <div>Loading....</div>;
  }

  if (projects && projects?.length === 0) {
    return (
      <div className="gap-4 h-full max-h-full flex flex-col">
        <EmptyProjectView />
      </div>
    );
  }

  if (projects && projects?.length > 0) {
    return (
      <div className="gap-4 h-full max-h-full flex flex-col">
        <ProjectHeader />
        <div className="grid grid-cols-2 gap-8 px-24 w-full flex-1 pb-4 min-h-0">
          <ProjectWrapper type="owner" isEmpty={adminProjects.length === 0}>
            {adminProjects.map((item) => (
              <ProjectCard key={item.project?.id} data={item} />
            ))}
            {isFetchingNextPage && <Skeleton className="h-[360px] w-full" />}
            {hasNextPage && <div ref={targetRef} />}
          </ProjectWrapper>

          <ProjectWrapper type="member" isEmpty={otherProjects.length === 0}>
            {otherProjects.map((item) => (
              <ProjectCard key={item.project?.id} data={item} />
            ))}
            {isFetchingNextPage && <Skeleton className="h-[360px] w-full" />}
            {hasNextPage && <div ref={targetRef} />}
          </ProjectWrapper>
        </div>
      </div>
    );
  }
};
export default ProjectPage;
