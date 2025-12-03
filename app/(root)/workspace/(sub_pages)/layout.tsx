import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full h-full grid grid-cols-2">
      <div>image</div>
      <div className="w-full h-full flex flex-col items-center justify-center">{children}</div>
    </div>
  );
};
export default Layout;
