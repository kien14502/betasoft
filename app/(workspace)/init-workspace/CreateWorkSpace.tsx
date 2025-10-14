'use client';
import { TeamOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio } from 'antd';
import React from 'react';
import styles from './init_workspace.module.css';
import { usePostAuthOrganizations } from '@/app/api/organizations/organizations';
import { RequestCreateOrganizationRequest } from '@/app/api/generated.schemas';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
interface CreateWorkSpaceProps {
  goToJoin?: () => void;
}

type TCreateWorkSpaceForm = {
  name: string;
  size: number;
};

const CreateWorkSpace = ({ goToJoin }: CreateWorkSpaceProps) => {
  const { mutate, isPending } = usePostAuthOrganizations();
  const router = useRouter();

  const onFinish = (values: TCreateWorkSpaceForm) => {
    const payload: RequestCreateOrganizationRequest = {
      name: values.name,
      size: values.size,
    };
    mutate(
      { data: payload },
      {
        onSuccess: (res) => {
          showToast(res.message!, 'success');
          router.push('/workspace');
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };
  return (
    <div>
      <div
        style={{
          fontSize: '2.5em',
          fontWeight: 700,
          width: '100%',
          textAlign: 'center',
          margin: '10% 0 10% 0',
        }}
      >
        Create Workspace
      </div>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Workspace Name"
          rules={[
            { required: true, message: 'Workspace name is required' },
            { min: 3, message: 'Workspace name must be at least 3 characters' },
          ]}
        >
          <Input variant="underlined" style={{ height: '50px', background: '#eff5fb' }} />
        </Form.Item>

        <Form.Item
          name="size"
          label={
            <span style={{ padding: 10 }}>
              <TeamOutlined /> Workspace Size
            </span>
          }
        >
          <Radio.Group style={{ border: '0 solid' }} className={styles.radioWarrap}>
            <Radio.Button value={5}>2-5</Radio.Button>
            <Radio.Button value={10}>6-10</Radio.Button>
            <Radio.Button value={20}>11-20</Radio.Button>
            <Radio.Button value={50}>21-50</Radio.Button>
            <Radio.Button value={100}>51-100</Radio.Button>
            <Radio.Button value={250}>101-250</Radio.Button>
            <Radio.Button value={1000}>250-mo</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item style={{ marginTop: '40px' }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: '100%',
              height: '40px',
              borderRadius: '0px',
              fontSize: '16px',
            }}
            loading={isPending}
          >
            Continue
          </Button>
        </Form.Item>

        <Button
          color="primary"
          variant="outlined"
          style={{
            width: '100%',
            height: '40px',
            borderRadius: '0px',
            fontSize: '16px',
          }}
          onClick={goToJoin}
        >
          Join Organization
        </Button>
      </Form>
    </div>
  );
};

export default CreateWorkSpace;
