'use client';

import { Button, Col, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function CreatePass() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = (values: unknown) => {
    setLoading(true);
    createPass(values as string);
    setTimeout(() => setLoading(false), 2000); // Simulate API call
  };

  const createPass = async (values: string) => {
    setLoading(true);
    setLoading(false);
    router.push('./init-workspace');
  };

  return (
    <Row justify="center">
      <Col
        xs={24}
        sm={20}
        md={16}
        lg={12}
        xl={10}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%', margin: 'auto', padding: '10%' }}>
          <div
            style={{
              position: 'relative',
              height: '20vh',
              width: '60%',
              display: 'flex',
              alignItems: 'center',
              margin: 'auto',
            }}
          >
            <Image
              src={'/logo_company.png'}
              alt="logo-company"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              fill
            />
          </div>
          <div>
            <div
              style={{
                fontSize: '2.5em',
                fontWeight: 700,
                padding: '5%',
                textAlign: 'center',
              }}
            >
              Create Password
            </div>
            <Form form={form} onFinish={onFinish} layout="vertical" style={{ width: 'auto' }}>
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

              <Form.Item style={{ marginTop: '40px' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '0px',
                    fontSize: '16px',
                  }}
                >
                  Continue
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default CreatePass;
