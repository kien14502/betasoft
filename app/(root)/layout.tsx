import AuthProvider from '@/components/providers/AuthProvider';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return <AuthProvider>{children}</AuthProvider>;
};
export default Layout;
