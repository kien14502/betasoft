import { ReactNode } from 'react';
import HomeHeader from './components/header/HomeHeader';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <HomeHeader />
    {children}
  </>
);

export default Layout;
