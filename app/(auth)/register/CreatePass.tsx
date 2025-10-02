'use client';
import { usePostAuthRegister } from '@/app/api/auth/auth';
import { RequestRegisterRequest } from '@/app/api/generated.schemas';
import { showToast } from '@/app/utils/toast';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { setClientCookie } from '@/app/utils/cookie.client';
import localStorage from '@/app/utils/localStorage';
import { EToken } from '@/app/constants';

interface ICreatePassValues {
  password: string;
  confirm_password: string;
}

interface ICreatePassProps {
  data: RequestRegisterRequest;
  setData: Dispatch<SetStateAction<RequestRegisterRequest>>;
}

const CreatePass = ({ data, setData }: ICreatePassProps) => {
  const { mutate, isPending } = usePostAuthRegister();
  const router = useRouter();

  const handleSubmit = (values: ICreatePassValues) => {
    const payload: RequestRegisterRequest = {
      ...data,
      password: values.password,
      step: 3,
    };
    mutate(
      { data: payload },
      {
        onSuccess: async (res) => {
          showToast(res.message!, 'success');
          data.step = 3;
          setData(data);
          setClientCookie(EToken.ACCESS_TOKEN, res.data?.token || '');
          localStorage.add('userData', res.data?.user?.toString() ?? '');
          console.log('accessToken', res.data);
          router.push('./init-workspace');
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        padding: '10%',
      }}
    >
      <div style={{ height: '66%', width: '100%' }}>
        <div style={{ fontSize: '30px', fontWeight: 750, paddingBottom: '5%' }}>
          Create new passworld
        </div>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="password"
            label="New Password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password
              variant="underlined"
              style={{ height: '50px', background: '#eff5fb' }}
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            label="Confirm New Password"
            rules={[
              { required: true, message: 'Confirm Password is required' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              variant="underlined"
              style={{ height: '50px', background: '#eff5fb' }}
            />
          </Form.Item>

          <Form.Item style={{ paddingTop: '20px' }}>
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
              Submit
            </Button>
          </Form.Item>

          <hr style={{ margin: '30px 0 10px 0', border: '1px solid #ecececff' }} />

          {/* Link to Login Page */}
          <Form.Item>
            <div style={{ textAlign: 'center' }}>
              <Link href="/login">Already have an account?</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreatePass;
