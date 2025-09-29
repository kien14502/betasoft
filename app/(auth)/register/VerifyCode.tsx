import { usePostAuthRegister } from '@/app/api/auth/auth';
import { RequestRegisterRequest } from '@/app/api/generated.schemas';
import { showToast } from '@/app/utils/toast';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';

interface IVerifyFormValues {
  code: string;
}

interface IVerifyCodeProps {
  data: RequestRegisterRequest;
  setData: Dispatch<SetStateAction<RequestRegisterRequest>>;
}

const VerifyCode = ({ data, setData }: IVerifyCodeProps) => {
  const { mutate, isPending } = usePostAuthRegister();
  const { mutate: resendMutate, isPending: isPendingReSend } = usePostAuthRegister();

  const handleSubmit = (values: IVerifyFormValues) => {
    const payload: RequestRegisterRequest = {
      ...data,
      verify_code: values.code,
      step: 2,
    };
    mutate(
      { data: payload },
      {
        onSuccess: (res) => {
          showToast(res.message!, 'success');
          payload.step = 3;
          setData(payload);
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };

  const resend = () => {
    const payload: RequestRegisterRequest = {
      ...data,
      step: 1,
    };
    resendMutate(
      { data: payload },
      {
        onSuccess: (res) => {
          showToast(res.message!, 'success');
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
          Verify Code from Email
        </div>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item name="code" rules={[{ required: true, message: 'Verify Code is required' }]}>
            <Input.OTP formatter={(str) => str.toUpperCase()} />
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
              Next
            </Button>
          </Form.Item>
          <hr style={{ margin: '30px 0 10px 0', border: '1px solid #ecececff' }} />

          {/* Link to Login Page */}
          <div>
            <div>
              {isPendingReSend ? (
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              ) : (
                <a onClick={resend} style={{ cursor: 'pointer' }}>
                  Resend?
                </a>
              )}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="/login">Already have an account?</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerifyCode;
