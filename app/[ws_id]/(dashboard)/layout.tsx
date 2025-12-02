import React from 'react';
import MainHeader from '@/components/layout/MainHeader';
import Sidebar from '@/components/layout/sidebar';

function LayoutConfig({ children }: { children: React.ReactNode }) {
  return <> {children}</>;

  return (
    <div className="w-screen h-screen bg-secondary overflow-hidden">
      <Sidebar />
      <div className="w-screen h-screen flex flex-col pl-14 bg-secondary overflow-hidden">
        <MainHeader />
        <div className="flex flex-col min-h-0 h-[calc(100vh-64px)]">
          {/* {children} */}
          <div className="overflow-hidden min-h-0 h-full flex flex-col p-4 pt-2 gap-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutConfig;
