'use client';
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Flex,
  Grid,
  Layout,
  Menu,
  Row,
  Modal,
  Form,
  Input,
} from 'antd';
import Link from 'next/link';
import { Header } from 'antd/es/layout/layout';
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePostAuthOrganizationsJoin } from '../api/organizations/organizations';
import { RequestJoinOrganizationRequest } from '../api/generated.schemas';
import { clearClientCookies } from '@/utils/cookie.client';

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const LayoutWorkSpace = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalInviteOpen, setIsModalInviteOpen] = useState(false);
  const { mutate, isPending } = usePostAuthOrganizationsJoin();
  const screens = useBreakpoint();
  const router = useRouter();
  const items = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: 'Logout',
      icon: (
        <LogoutOutlined
          onClick={() => {
            clearClientCookies();
            router.push('/login');
          }}
        />
      ),
    },
    {
      key: '3',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
  ];
  const toggleModalInvite = () => setIsModalInviteOpen(!isModalInviteOpen);

  const handleSubmit = (value: RequestJoinOrganizationRequest) => {
    mutate(
      { data: value },
      {
        onSuccess: () => {
          setIsModalInviteOpen(false);
          router.refresh();
        },
      },
    );
  };

  return (
    <Layout>
      {/* test husky 0.1*/}
      <Sider
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        onBreakpoint={() => {
          // console.log(broken);
        }}
      >
        <Link href={'/workspace'} style={{ color: 'black' }}>
          <div
            style={{
              backgroundColor: 'Tan',
              height: '7vh',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Image src={'/logo-mini.png'} alt="logo_mini" width={20} height={20} />
            {screens.lg && !collapsed && <h2>BETASOFT</h2>}
          </div>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: 'dashboard',
              icon: <HomeOutlined />,
              label: <Link href={'/workspace'}>Home</Link>,
              title: 'Dashboard',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, height: '7vh' }}>
          <Row>
            <Col span={12}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col span={12}>
              <Flex justify={'flex-end'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Button type="primary" onClick={toggleModalInvite}>
                    Join Workspace
                  </Button>
                  <Link href="/workspace/new">
                    <Button style={{ backgroundColor: 'white' }}>Create A New WorkSpace</Button>
                  </Link>

                  <Modal
                    title="Basic Modal"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalInviteOpen}
                    footer={null}
                    onCancel={toggleModalInvite}
                  >
                    <Form onFinish={handleSubmit} layout="vertical">
                      <Form.Item
                        name="invite_code"
                        label="Invite Code"
                        rules={[{ required: true, message: 'Invite code is required' }]}
                      >
                        <Input
                          variant="underlined"
                          style={{ height: '50px', background: '#eff5fb' }}
                        />
                      </Form.Item>
                      <Button loading={isPending} htmlType="submit">
                        Join
                      </Button>
                    </Form>
                  </Modal>
                </div>
                <div style={{ paddingInlineEnd: 10 }}>
                  <Dropdown
                    trigger={['click']}
                    menu={{ items }}
                    placement="bottomRight"
                    arrow={{ pointAtCenter: true }}
                  >
                    <Avatar icon={<UserOutlined />} />
                  </Dropdown>
                </div>
              </Flex>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            height: '93vh',
            padding: '3vh',
            minHeight: 280,
            backgroundColor: 'gray 100',
          }}
        >
          <div
            style={{
              height: '100%',
              padding: '2%',
              backgroundColor: 'white',
              overflowY: 'auto',
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWorkSpace;
