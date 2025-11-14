import React from 'react';
import MainHeader from '@/components/layout/MainHeader';
import Sidebar from '@/components/layout/sidebar';

function LayoutConfig({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen bg-secondary">
      <Sidebar />
      <div className="w-screen h-screen pl-14 bg-secondary overflow-hidden">
        <div className="pl-8 py-4 px-4 flex-col w-full h-full flex">
          <MainHeader />
          {children}
        </div>
      </div>
    </div>
  );
}

export default LayoutConfig;
