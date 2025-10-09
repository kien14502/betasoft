'use client';
import { RequestChangePasswordRequest } from '@/app/api/generated.schemas';
import { usePatchAuthUserPassword } from '@/app/api/users/users';
import { showToast } from '@/app/utils/toast';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';

const ChangePasswordPage = () => {
  const [form] = Form.useForm<RequestChangePasswordRequest>();
  const { mutate, isPending } = usePatchAuthUserPassword();
  const navigate = useRouter();

  const onFinish = (values: RequestChangePasswordRequest) =>
    mutate(
      {
        data: {
          old_password: values.old_password,
          new_password: values.new_password,
        },
      },
      {
        onSuccess({ message }) {
          navigate.push('/home');
          showToast(message ?? 'Change password successfully', 'success');
        },
      },
    );
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
        <Card
          style={{
            width: '85%',
            margin: 'auto',
            borderRadius: 0,
            padding: '5%',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: '3em',
              fontWeight: 700,
              marginBottom: '10px',
            }}
          >
            Change your password!!
          </div>
          <p style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 400 }}>
            There is nothing to worry about, we&apos;ll send you a message to help you reset your
            password.
          </p>

          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="old_password"
              label="Old Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="new_password"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm New Password"
              dependencies={['new_password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The new password that you entered do not match!'),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
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
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default ChangePasswordPage;
