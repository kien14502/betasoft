'use client';
import { PlusCircleFilled, PlusOutlined } from '@ant-design/icons';
import EmptyProjectView from './components/EmptyProjectView';
import { Pagination } from '@/interface/common';
import { useContext, useState } from 'react';
import ProjectCard from './components/ProjectCard';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useGetAuthProjectsMyProjectsOrgId } from '@/app/api/project/project';
import { AuthContext } from '@/components/providers/AuthProvider';

const ProjectPage = () => {
  const { profile } = useContext(AuthContext);
  const router = useRouter();
  const [pagination] = useState<Pagination>({
    page: 1,
    page_size: 10,
  });

  const { data } = useGetAuthProjectsMyProjectsOrgId(profile?.meta_data?.organization_id ?? '', {
    ...pagination,
  });

  const projects = data?.data;

  const onCreatePrj = () => router.push('/home/project/new');

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <Button
          onClick={onCreatePrj}
          style={{ border: '2px dashed #0045AC', padding: '24px 20px', borderRadius: '14px' }}
          type="dashed"
        >
          <PlusCircleFilled style={{ fontSize: '28px' }} />
          Create project
        </Button>
        <button className="color-main shadow-btn !ml-auto flex items-center gap-3 text-[18px] font-semibold rounded-[64px] shadow-btn !py-4 !px-9">
          <PlusOutlined style={{ fontSize: '32px' }} />
          New Task
        </button>
      </div>
      {projects ? (
        <div className="grid grid-cols-4 gap-4">
          {projects.projects?.map((item, i) => (
            <ProjectCard data={item} key={i} />
          ))}
        </div>
      ) : (
        <EmptyProjectView onClick={onCreatePrj} />
      )}
    </div>
  );
};
export default ProjectPage;
