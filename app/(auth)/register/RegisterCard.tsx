'use client';
import { Form, Input, Button, Row, Col, Checkbox } from 'antd';
import { GoogleOutlined, AppleFilled } from '@ant-design/icons';
import Link from 'next/link';
import styles from './register_card.module.css';
import { RequestRegisterRequest } from '@/app/api/generated.schemas';
import { Dispatch, SetStateAction } from 'react';
import { usePostAuthRegister } from '@/app/api/auth/auth';
import { showToast } from '@/utils/toast';

export interface IRegisterFormValues {
  email: string;
  first_name: string;
  last_name: string;
}

interface RegisterFormProps {
  setDataPayload: Dispatch<SetStateAction<RequestRegisterRequest>>;
}

const RegisterForm = ({ setDataPayload }: RegisterFormProps) => {
  const { mutate, isPending } = usePostAuthRegister();

  const handleSubmit = (values: IRegisterFormValues) => {
    const payload: RequestRegisterRequest = {
      email: values.email,
      full_name: values.first_name + ' ' + values.last_name,
      step: 1,
    };
    mutate(
      { data: payload },
      {
        onSuccess: (res) => {
          showToast(res.message!, 'success');
          payload.step = 2;
          setDataPayload(payload);
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
        <div style={{ fontSize: '30px', fontWeight: 750, paddingBottom: '5%' }}>Sign Up Free</div>
        <Form onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true, message: 'Full name is required' }]}
              >
                <Input variant="underlined" style={{ height: '50px', background: '#eff5fb' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true, message: 'Full name is required' }]}
              >
                <Input variant="underlined" style={{ height: '50px', background: '#eff5fb' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Email is not valid' },
            ]}
          >
            <Input variant="underlined" style={{ height: '50px', background: '#eff5fb' }} />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
          >
            <Checkbox
              style={{ marginTop: '0', alignItems: 'flex-start' }}
              className={styles.checkbox}
            >
              Agree to the terms of use and acknowledge that you have read our privacy policy, which
              describes how we collect, use, store, and share your data.
            </Checkbox>
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
              Sign Up
            </Button>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Button
                color="primary"
                variant="outlined"
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '0px',
                  fontSize: '16px',
                }}
              >
                <GoogleOutlined /> Login with Google
              </Button>
            </Col>
            <Col span={12}>
              <Button
                color="primary"
                variant="outlined"
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '0px',
                  fontSize: '16px',
                }}
              >
                <AppleFilled /> Login with Apple
              </Button>
            </Col>
          </Row>

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

export default RegisterForm;
