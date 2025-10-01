'use client';
import { TeamOutlined, GlobalOutlined, FileTextOutlined, AimOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Select, UploadFile } from 'antd';
import React, { useEffect } from 'react';
import {
  useGetAuthOrganizationsId,
  usePostAuthOrganizations,
  usePatchAuthOrganizations,
} from '@/app/api/organizations/organizations';
import { RequestCreateOrganizationRequest } from '@/app/api/generated.schemas';
import { showToast } from '@/app/utils/toast';
import { useRouter } from 'next/navigation';
import UploadImage, { normalizeImage } from '@/app/components/common/UploadImage';
import { useForm } from 'antd/es/form/Form';

interface INewWorkSpaceProps {
  idWorkSpace?: string;
}

type TNewWorkSpaceForm = {
  id?: string;
  industry: string;
  avatar?: UploadFile[];
  name: string;
  size?: number;
  region?: string;
  description?: string;
};

const NewWorkSpace = ({ idWorkSpace }: INewWorkSpaceProps) => {
  const [form] = useForm();
  const { mutate, isPending } = usePostAuthOrganizations();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatchAuthOrganizations();
  const router = useRouter();
  const { data, isPending: isPendingGetData } = useGetAuthOrganizationsId(idWorkSpace ?? '', {
    query: {
      enabled: !!idWorkSpace,
      refetchOnMount: 'always',
      select: (response) => {
        const { data } = response;
        return {
          id: data?.id,
          industry: data?.industry || '',
          avatar: data?.avatar ? normalizeImage(Array(data?.avatar)) : [],
          name: data?.name || '',
          size: data?.size,
          region: data?.region,
          description: data?.description,
        };
      },
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const onFinish = (values: TNewWorkSpaceForm) => {
    const payload: RequestCreateOrganizationRequest = {
      avatar: values.avatar?.[0].response,
      name: values.name,
      size: values.size,
      industry: values.industry,
      region: values.region,
      description: values.description,
    };

    if (idWorkSpace) {
      return mutateUpdate(
        {
          data: {
            org_id: data?.id,
            ...payload,
          },
        },
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
    }

    return mutate(
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
    <Form form={form} onFinish={onFinish} layout="vertical">
      {/* Workspace Name */}
      <Form.Item name={'avatar'} label={'Avatar'}>
        <UploadImage maxImageUpload={1} width={150} height={150} aspect={1} />
      </Form.Item>
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

      {/* Workspace Size */}
      <Form.Item
        name="size"
        label={
          <span style={{ padding: 10 }}>
            <TeamOutlined /> Workspace Size
          </span>
        }
        rules={[{ required: true, message: 'Workspace size is required' }]}
      >
        <Radio.Group style={{ border: '0 solid' }}>
          <Radio.Button value={5}>2-5</Radio.Button>
          <Radio.Button value={10}>6-10</Radio.Button>
          <Radio.Button value={20}>11-20</Radio.Button>
          <Radio.Button value={50}>21-50</Radio.Button>
          <Radio.Button value={100}>51-100</Radio.Button>
          <Radio.Button value={250}>101-250</Radio.Button>
          <Radio.Button value={1000}>250+</Radio.Button>
        </Radio.Group>
      </Form.Item>

      {/* Region */}
      <Form.Item
        name="region"
        label={
          <span style={{ padding: 10 }}>
            <GlobalOutlined /> Region
          </span>
        }
      >
        <Select placeholder="Select a region">
          <Select.Option value="us-east">US East</Select.Option>
          <Select.Option value="us-west">US West</Select.Option>
          <Select.Option value="eu-central">EU Central</Select.Option>
          <Select.Option value="asia">Asia Pacific</Select.Option>
        </Select>
      </Form.Item>

      {/* Industry */}
      <Form.Item
        name="industry"
        label={
          <span style={{ padding: 10 }}>
            <AimOutlined /> Industry
          </span>
        }
      >
        <Select placeholder="Select a industry">
          <Select.Option value="Technology">Technology</Select.Option>
          <Select.Option value="Healthcare">Healthcare</Select.Option>
          <Select.Option value="Finance">Finance</Select.Option>
          <Select.Option value="Education">Education</Select.Option>
          <Select.Option value="Retail">Retail</Select.Option>
          <Select.Option value="Manufacturing">Manufacturing</Select.Option>
          <Select.Option value="Consulting">Consulting</Select.Option>
        </Select>
      </Form.Item>

      {/* Description */}
      <Form.Item
        name="description"
        label={
          <span style={{ padding: 10 }}>
            <FileTextOutlined /> Description
          </span>
        }
        rules={[{ max: 200, message: 'Description must be under 200 characters' }]}
      >
        <Input.TextArea rows={4} placeholder="Enter a short description..." />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item style={{ marginTop: '40px' }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            height: '40px',
            borderRadius: '0px',
            fontSize: '16px',
          }}
          loading={isPending || isPendingUpdate}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewWorkSpace;
