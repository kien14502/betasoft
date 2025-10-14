import { useGetAuthOrganizationsOrgIdMembers } from '@/app/api/organizations/organizations';
import { Button, Dropdown, Form, Input, MenuProps, Select } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react';
import InviteMemberModal from './InviteMemberModal';
import ListDataPage from '@/components/ListDataPage/ListTablePage';
import { useStore } from '@/store';
import { ResponseGetMembersInOrgResponse } from '@/app/api/generated.schemas';

interface IWorkSpaceViewProps {
  idWorkSpace: string;
}

const WorkSpaceView = ({ idWorkSpace }: IWorkSpaceViewProps) => {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [{ workspace }] = useStore();

  const { data } = useGetAuthOrganizationsOrgIdMembers(idWorkSpace);

  const { workspaceActive } = workspace;

  const menuAction = (_: unknown, record: AnyObject): MenuProps['items'] => [
    {
      key: '1',
      label: <Button onClick={() => {}}>Edit</Button>,
    },
    {
      key: '2',
      label: <Button>View</Button>,
    },
    {
      key: '3',
      label: <Button>Delete</Button>,
    },
  ];
  return (
    <div>
      <ListDataPage
        listHeader={{
          title: workspaceActive?.name || '',
          buttonActions: [
            {
              label: 'Invite',
              onClick: () => {
                setIsModalOpen(true);
              },
              // icon: <UserDeleteOutlined />,
              type: 'primary',
              style: { backgroundColor: 'teal' },
            },
            {
              label: 'Search',
              onClick: () => {
                console.log('Search clicked', form.getFieldsValue());
              },
              type: 'primary',
            },
          ],
        }}
        listFilter={{
          filters: [
            <Form.Item
              key={'email'}
              label="Email"
              name="email"
              // rules={[{ required: true, message: 'Please input email!' }]}
            >
              <Input />
            </Form.Item>,
            <Form.Item
              key={'role'}
              label="Role"
              name="role"
              // rules={[{ required: true, message: 'Please input role!' }]}
            >
              <Select
                options={[
                  { label: 'Admin', value: 'admin' },
                  { label: 'Member', value: 'member' },
                ]}
              />
            </Form.Item>,
          ],
          form,
        }}
        listTableData={{
          columns: [
            {
              title: 'Avatar',
              dataIndex: 'avatar',
              key: 'avatar',
            },
            {
              title: 'Email',
              dataIndex: 'user_email',
              key: 'user_email',
            },
            {
              title: 'Role',
              dataIndex: 'role',
              key: 'role',
            },
            {
              title: 'Joined At',
              dataIndex: 'joined_at',
              key: 'joined_at',
            },
            {
              title: '',
              key: 'actions',
              render: (_, record) => (
                <Dropdown menu={{ items: menuAction(_, record) }} placement="bottomRight" arrow>
                  <Button>Actions</Button>
                </Dropdown>
              ),
            },
          ],
          dataSource: data?.data?.members ?? [],
          pagination: {
            current: 1,
            pageSize: 10,
            total: 4,
            onChange: (page, pageSize) => {
              console.log(`Page: ${page}, PageSize: ${pageSize}`);
            },
          },
        }}
      />
      <InviteMemberModal
        id={idWorkSpace}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default WorkSpaceView;
