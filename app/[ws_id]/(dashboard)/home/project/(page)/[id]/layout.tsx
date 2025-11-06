'use client';

import { ReactNode, use } from 'react';
import { ProjectProvider } from '@/components/providers/ProjectProvider';
import ProjectHeader from '../../components/ProjectHeader';
import MemberProjectProvider from '@/components/providers/MembersProjectProvider';
import { TasksProvider } from '@/components/providers/TasksProvider';

type Props = { children: ReactNode; params: Promise<{ id: string }> };

const Layout: React.FC<Props> = ({ children, params }) => {
  const { id } = use(params);

  return (
    <ProjectProvider id={id}>
      <MemberProjectProvider id={id}>
        <ProjectHeader>
          <TasksProvider id={id}>{children}</TasksProvider>
        </ProjectHeader>
      </MemberProjectProvider>
    </ProjectProvider>
  );
};
export default Layout;
