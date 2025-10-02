'use client';
import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import HeaderDashboard from '../components/layout/dashboard/HeaderDashboard';
import MenuDashboard from '../components/layout/dashboard/MenuDashboard';
import { Footer } from 'antd/es/layout/layout';

const { Content } = Layout;

import { lightTheme } from '../theme';
import { useStore } from '../store';

function LayoutConfig({ children }: { children: React.ReactNode }) {
  const [{ config }] = useStore();
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
        <HeaderDashboard collapsed={false} setCollapsed={() => {}} />
        <MenuDashboard />
        <Content style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              padding: 24,
              height: '100%',
              display: 'flex',
              width: '100%',
            }}
          >
            {children}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </ConfigProvider>
  );
}

export default LayoutConfig;
