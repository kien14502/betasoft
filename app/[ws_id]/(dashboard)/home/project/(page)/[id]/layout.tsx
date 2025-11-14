'use client';

import { ReactNode, use } from 'react';
import { ProjectProvider } from '@/components/providers/ProjectProvider';
import MemberProjectProvider from '@/components/providers/MembersProjectProvider';
import { TasksProvider } from '@/components/providers/TasksProvider';
import ProjectIdHeader from '../../../components/header/ProjetIdHeader';
import ProjectRouters from '../../../components/header/ProjectRouters';

type Props = { children: ReactNode; params: Promise<{ id: string }> };

const Layout: React.FC<Props> = ({ children, params }) => {
  const { id } = use(params);

  return (
    <ProjectProvider id={id}>
      <MemberProjectProvider id={id}>
        <TasksProvider id={id}>
          <ProjectIdHeader />
          <ProjectRouters>{children}</ProjectRouters>
        </TasksProvider>
      </MemberProjectProvider>
    </ProjectProvider>
  );
};
export default Layout;
