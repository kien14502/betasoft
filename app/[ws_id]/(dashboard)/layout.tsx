'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import MenuDashboard from '@/components/layout/dashboard/MenuDashboard';
import HomeHeader from '@/components/layout/HomeHeader';
import MainHeader from '@/components/layout/MainHeader';

function LayoutConfig({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ height: '100vh', background: '#F4FAFC' }}>
      <MainHeader subHeader={<>{pathname.split('/').includes('home') && <HomeHeader />}</>} />
      <MenuDashboard />
      <div
        style={{
          marginLeft: '98px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="h-full px-6 pb-6 flex w-full">{children}</div>
      </div>
    </div>
  );
}

export default LayoutConfig;
