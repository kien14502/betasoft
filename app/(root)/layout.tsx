import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div
      style={{
        backgroundImage: `url(/images/bg-ws.png)`,
      }}
      className="w-screen h-screen overflow-hidden bg-no-repeat bg-cover flex items-center justify-center"
    >
      {children}
    </div>
  );
};
export default Layout;
