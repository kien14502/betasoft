import { ReactNode } from 'react';
import SidebarConverstation from './components/sidebar';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-white flex h-full w-full rounded-2xl shadow-secondary">
      <SidebarConverstation />
      {children}
    </div>
  );
};

export default Layout;
