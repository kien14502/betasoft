import { ReactNode } from 'react';
import { ProjectProvider } from '@/components/providers/ProjectProvider';
import ProjectIdHeader from '../../../components/header/ProjetIdHeader';
import ProjectRouters from '../../../components/header/ProjectRouters';

type Props = { children: ReactNode; params: Promise<{ id: string }> };

const Layout: React.FC<Props> = async ({ children, params }) => {
  const { id } = await params;

  return (
    <ProjectProvider id={id}>
      <ProjectIdHeader />
      <ProjectRouters>{children}</ProjectRouters>
    </ProjectProvider>
  );
};
export default Layout;
