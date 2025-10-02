import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';

interface JoinWorkSpaceProps {
  goToCreate: () => void;
}

const JoinOrganization = ({ goToCreate }: JoinWorkSpaceProps) => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    setLoading(true);
    console.log('Received values:', values);
    setTimeout(() => setLoading(false), 2000); // Simulate API call
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
        Join Organization
      </div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="code"
          label="Enter Code"
          rules={[{ required: true, message: 'Code is required' }]}
        >
          <Input variant="underlined" style={{ height: '50px', background: '#eff5fb' }} />
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
            loading={loading}
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
          onClick={goToCreate}
        >
          Create Workspace
        </Button>
      </Form>
    </div>
  );
};

export default JoinOrganization;
