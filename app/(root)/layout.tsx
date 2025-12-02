import AuthProvider from '@/components/providers/AuthProvider';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <AuthProvider>
      <div
        style={{
          backgroundImage: `url(/images/bg-ws.png)`,
        }}
        className="w-screen h-screen overflow-hidden bg-no-repeat bg-cover flex items-center justify-center"
      >
        {children}
      </div>
    </AuthProvider>
  );
};
export default Layout;
