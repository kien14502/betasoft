import { usePostAuthLogout } from '@/app/api/users/users';
import {
  BellOutlined,
  LogoutOutlined,
  PlusCircleFilled,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Grid, Input, Menu, Popover } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Image from 'next/image';
import React from 'react';

const { useBreakpoint } = Grid;
import { useRouter } from 'next/navigation';
import { clearClientCookies } from '@/utils/cookie.client';

interface HeaderDashboardProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

function HeaderDashboard({ collapsed, setCollapsed }: HeaderDashboardProps) {
  const screens = useBreakpoint();
  const router = useRouter();

  const { mutate, isPending } = usePostAuthLogout();
  const logout = () => {
    mutate(undefined, {
      onSuccess: () => {
        localStorage.clear();
        clearClientCookies();
        router.push('./login');
      },
    });
  };
  return (
    <>
      <Header
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#F2F4F8',
          padding: '0.5rem 1rem',
          height: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="demo-logo">
            <Image src={'/logo-mini.png'} alt="logo_mini" width={20} height={20} />
            {screens.md && (
              <span
                style={{
                  color: '#697077',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                }}
              >
                BETASOFT
              </span>
            )}
          </div>
          <div>
            <Button
              style={{
                borderRadius: '20px',
                backgroundColor: '#e4e4e4',
                padding: 16,
              }}
            >
              <PlusCircleFilled />
              <span style={{ fontWeight: 600 }}>Create</span>
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '2%' }}>
            <div>
              <Input
                placeholder="Search for..."
                variant="filled"
                style={{ backgroundColor: '#ffff', borderRadius: 15 }}
                prefix={<SearchOutlined style={{ color: '#697178' }} />}
              />
            </div>
            <div>
              <Button shape="circle">
                <BellOutlined style={{ color: '#1f387d' }} />
              </Button>
            </div>
            <div>
              <Button shape="circle">
                <SettingOutlined style={{ color: '#1f387d' }} />
              </Button>
            </div>
            <div>
              <Popover
                placement="bottomRight"
                content={
                  <>
                    <div>Edit</div>
                    <div>
                      <a>
                        <Button
                          shape="circle"
                          icon={<LogoutOutlined />}
                          onClick={logout}
                          loading={isPending}
                        />
                      </a>
                    </div>
                  </>
                }
                trigger="click"
              >
                <Button shape="circle" icon={<UserOutlined style={{ color: '#1f387d' }} />} />
              </Popover>
            </div>
          </div>
        </div>
      </Header>
    </>
  );
}

export default HeaderDashboard;
