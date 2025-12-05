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
    isLoading,
  } = useInfiniteProjects(workspaceId);

  const { targetRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const { adminProjects, otherProjects } = groupRoleProjects(projects || []);

  return (
    <div className="gap-4 h-full max-h-full flex flex-col">
      {(projects || []).length > 0 ? (
        <>
          <ProjectHeader />
          <div className="grid grid-cols-2 gap-8 px-24 w-full flex-1 pb-4 min-h-0">
            <ProjectWrapper type="owner" isEmpty={adminProjects.length === 0}>
              {adminProjects.map((item) => (
                <ProjectCard key={item.project?.id} data={item} />
              ))}
              {isLoading && <Skeleton style={{ height: '360px', width: '100%' }} />}
              <div ref={targetRef} />
            </ProjectWrapper>
            <ProjectWrapper type="member" isEmpty={otherProjects.length === 0}>
              {otherProjects.map((item) => (
                <ProjectCard key={item.project?.id} data={item} />
              ))}
              {isLoading && <Skeleton style={{ height: '360px', width: '100%' }} />}
              <div ref={targetRef} />
            </ProjectWrapper>
          </div>
        </>
      ) : (
        <EmptyProjectView />
      )}
    </div>
  );
};
export default ProjectPage;
