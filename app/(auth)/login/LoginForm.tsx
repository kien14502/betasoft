'use client';

import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { GoogleOutlined, AppleFilled } from '@ant-design/icons';
import Link from 'next/link';
import './login-form.style.css';
import { usePostLogin } from '@/app/api/users/users';
import { setClientCookie } from '@/app/utils/cookie.client';
import { useRouter } from 'next/navigation';
import { EToken } from '@/app/constants';
import { saveAuthStorage } from '@/app/utils/authStorage';
interface ILoginFormValues {
  email: string;
  password: string;
  agreement?: boolean;
}

export default function Login() {
  const { mutate, isPending } = usePostLogin();
  const router = useRouter();

  const onFinish = (values: ILoginFormValues) => {
    mutate(
      { data: values },
      {
        onSuccess: (res) => {
          const token = res.data?.token || '';
          setClientCookie(EToken.ACCESS_TOKEN, token);
          saveAuthStorage('USER_DATA', res.data?.user || {});
          router.push('/home');
        },
      },
    );
  };

  // const handleGoogleLogin = () => {
  //   console.log('Google login clicked');
  //   // Add Google login integration here
  // };

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
        <div style={{ fontSize: '30px', fontWeight: 750, paddingBottom: '5%' }}>Login</div>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Email is not valid' },
            ]}
          >
            <Input variant="underlined" style={{ height: '50px', background: '#eff5fb' }} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password
              variant="underlined"
              style={{ height: '50px', background: '#eff5fb' }}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="agreement" valuePropName="checked">
                <Checkbox style={{ marginTop: '0', alignItems: 'flex-start' }}>
                  Remember me
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Link href="/forgot-pass" style={{ float: 'right', color: '#1677ff' }}>
                Forgot Password?
              </Link>
            </Col>
          </Row>

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
              Login
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
              <Link href="/register">No account yet? Sign Up</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
