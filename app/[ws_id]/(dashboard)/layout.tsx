'use client';
import React from 'react';
import { ConfigProvider, Layout } from 'antd';

import { usePathname } from 'next/navigation';
import MenuDashboard from '@/components/layout/dashboard/MenuDashboard';
import HomeHeader from '@/components/layout/HomeHeader';
import MainHeader from '@/components/layout/MainHeader';
import { useStore } from '@/store';
import { lightTheme } from '@/theme';

function LayoutConfig({ children }: { children: React.ReactNode }) {
  const [{ config }] = useStore();
  const pathname = usePathname();

  const getThemeConfig = () => {
    switch (config.theme) {
      case 'light':
        return lightTheme;
      //   case "dark":
      //     return lightTheme;
      default:
        return lightTheme;
    }
  };

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <Layout style={{ height: '100vh' }}>
        <MainHeader subHeader={<>{pathname.split('/').includes('home') && <HomeHeader />}</>} />
        <MenuDashboard />
        <Layout.Content style={{ marginLeft: '98px', display: 'flex', flexDirection: 'column' }}>
          <div className="h-full !px-6 !pb-6 flex w-full">{children}</div>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}

export default LayoutConfig;
