'use client';
import EmptyProjectView from './components/EmptyProjectView';
import { Pagination } from '@/interface/common';
import { useState } from 'react';
import ProjectCard from './components/ProjectCard';
import { useRouter } from 'next/navigation';
import { useGetAuthProjectsMyProjectsOrgId } from '@/app/api/project/project';
import useGetIdWorkspace from '@/hooks/useGetIdWorkspace';
import ProjectLoading from './components/ProjectsLoading';
import { groupRoleProjects } from '@/utils/common';
import { Button } from '@/components/ui/button';
import { Plus, PlusCircle } from 'lucide-react';

const ProjectPage = () => {
  const { idWs } = useGetIdWorkspace();
  const router = useRouter();
  const [pagination] = useState<Pagination>({ page: 1, page_size: 10 });

  const { data, isPending } = useGetAuthProjectsMyProjectsOrgId(idWs ?? '', {
    ...pagination,
    is_team: true,
  });
  const projects = data?.data?.projects ?? [];
  const { adminProjects, otherProjects } = groupRoleProjects(projects ?? []);

  const onCreatePrj = () => router.push('project/new');

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <Button
          variant={'ghost'}
          className="py-6! px-5! rounded-[14px] bg-white [&_svg]:size-7! h-[60px]! font-medium!"
          onClick={onCreatePrj}
          style={{ border: '2px dashed #0045AC' }}
        >
          <PlusCircle />
          Create project
        </Button>
        <button className="color-main shadow-btn ml-auto flex items-center gap-3 text-[18px] font-semibold rounded-[64px] shadow-btn !py-4 !px-9">
          <Plus style={{ fontSize: '32px' }} />
          New Task
        </button>
      </div>
      {isPending && <ProjectLoading />}
      {projects.length > 0 ? (
        <div className="grid grid-cols-2 mt-6">
          <div className="col-span-1 pr-8">
            <div className="flex flex-col">
              <p className="font-semibold text-base">You are Admin.</p>
              <span className="text-sm text-[#787878]">You created the project.</span>
            </div>
            <div className="gap-6 grid-cols-2 grid mt-6">
              {adminProjects.map((item) => (
                <ProjectCard key={item.project?.id} data={item} />
              ))}
            </div>
          </div>
          <div className="col-span-1 pl-8 border-l border-[#8E8E93]">
            <div className="flex flex-col">
              <p className="font-semibold text-base">You are Member.</p>
              <span className="text-sm text-[#787878]">You have been added in the project.</span>
            </div>
            <div className="gap-6 grid-cols-2 grid mt-6">
              {otherProjects.map((item) => (
                <ProjectCard key={item.project?.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <EmptyProjectView onClick={onCreatePrj} />
      )}
    </div>
  );
};
export default ProjectPage;
