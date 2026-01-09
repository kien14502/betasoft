import React from 'react';
import bg from '@/public/images/bg_auth.png';
import WavyDiv from './components/WavyDiv';
import Image from 'next/image';

// Set headers để prevent caching
export async function generateMetadata() {
  return {
    other: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  };
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
      className="w-screen h-screen overflow-hidden bg-no-repeat bg-cover grid grid-cols-1 sm:grid-cols-2"
    >
      <div className="relative">
        <div className="absolute top-10 flex items-center gap-2 left-20">
          <Image width={39} height={39} src={'/logo.svg'} alt="" />
          <span className="text-[32px] font-bold text-white">Asona AI</span>
        </div>
        <div className="flex-col h-full hidden sm:flex rotate-15 -space-y-10 items-center justify-center">
          <WavyDiv className="ml-52" height={172} width={430} />
          <WavyDiv className="mr-52" width={516} height={206} />
          <WavyDiv className="ml-27" width={516} height={206} />
          <WavyDiv className="mr-52" height={172} width={430} />
          <WavyDiv className="ml-27" width={516} height={206} />
        </div>
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
