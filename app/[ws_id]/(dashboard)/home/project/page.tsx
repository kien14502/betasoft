'use client';

import EmptyProjectView from './components/EmptyProjectView';
import { Pagination } from '@/interface/common';
import { useState } from 'react';
import ProjectCard from './components/ProjectCard';
import { useGetAuthProjectsMyProjectsOrgId } from '@/app/api/project/project';
import useGetIdWorkspace from '@/hooks/useGetIdWorkspace';
import ProjectLoading from './components/ProjectsLoading';
import { groupRoleProjects } from '@/utils/common';
import ProjectWrapper from './components/ProjectWrapper';
import ProjectHeader from '../components/header/ProjectHeader';

const ProjectPage = () => {
  const { idWs } = useGetIdWorkspace();
  const [pagination] = useState<Pagination>({ page: 1, page_size: 10 });
  const { data, isPending } = useGetAuthProjectsMyProjectsOrgId(
    idWs ?? '',
    {
      ...pagination,
      is_team: true,
    },
    { query: { select: (data) => data.data } },
  );

  const projects = data?.projects ?? [];
  const { adminProjects, otherProjects } = groupRoleProjects(projects ?? []);

  if (isPending) return <ProjectLoading />;

  return (
    <div className="gap-4 h-full max-h-full flex flex-col">
      {projects.length > 0 ? (
        <>
          <ProjectHeader wsId={idWs} />
          <div className="grid grid-cols-2 gap-8 px-24 w-full max-h-full h-full">
            <ProjectWrapper type="owner" isEmpty={adminProjects.length === 0}>
              <div className="flex flex-wrap gap-6">
                {adminProjects.map((item) => (
                  <ProjectCard key={item.project?.id} data={item} />
                ))}
              </div>
            </ProjectWrapper>
            <ProjectWrapper type="member" isEmpty={otherProjects.length === 0}>
              {otherProjects.map((item) => (
                <ProjectCard key={item.project?.id} data={item} />
              ))}
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
