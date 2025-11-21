import React from 'react';
import bg from '@/public/images/bg_auth.png';
import WavyDiv from './components/WavyDiv';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
      className="w-screen h-screen overflow-hidden bg-no-repeat bg-cover grid grid-cols-2"
    >
      <div className="flex flex-col rotate-15 -space-y-10 items-center justify-center">
        <WavyDiv className="ml-52" height={172} width={430} />
        <WavyDiv className="mr-52" width={516} height={206} />
        <WavyDiv className="ml-27" width={516} height={206} />
        <WavyDiv className="mr-52" height={172} width={430} />
        <WavyDiv className="ml-27" width={516} height={206} />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <div className="px-16 py-12 bg-white shadow-secondary flex flex-col gap-10 rounded-4xl max-w-[600px] w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
