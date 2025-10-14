import { RequestForgotPasswordRequest } from '@/app/api/generated.schemas';
import { usePostForgotPassword } from '@/app/api/users/users';
import { showToast } from '@/utils/toast';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';

type Props = {
  step: number;
};

const ConfirmNewPasswordForm: React.FC<Props> = ({ step }) => {
  const { replace } = useRouter();
  const { mutate, isPending } = usePostForgotPassword();
  const [form] = Form.useForm<RequestForgotPasswordRequest & { confirmNewPassword: string }>();

  const onFinish = (values: RequestForgotPasswordRequest) => {
    mutate(
      {
        data: {
          email: values.email,
          new_password: values.new_password,
          verify_code: values.verify_code,
          step,
        },
      },
      {
        onSuccess({ message }) {
          showToast(message!, 'success');
          replace('/login');
        },
      },
    );
  };
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="email"
        label="Email Address"
        rules={[
          { required: true, message: 'Email Address is required' },
          { type: 'email', message: 'Email is not valid' },
        ]}
      >
        <Input
          variant="underlined"
          style={{ height: '50px', background: '#eff5fb' }}
          placeholder="Enter personal or work email address"
        />
      </Form.Item>
      <Form.Item
        name="new_password"
        label="New password"
        rules={[
          {
            required: true,
            message: 'Please input your New Password!',
          },
          {
            min: 8,
            message: 'Password must be at least 8 characters long!',
          },
        ]}
        hasFeedback
      >
        <Input.Password
          variant="underlined"
          style={{ height: '50px', background: '#eff5fb' }}
          placeholder="Enter personal or work email address"
        />
      </Form.Item>
      <Form.Item
        name="confirmNewPassword"
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
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
          variant="underlined"
          style={{ height: '50px', background: '#eff5fb' }}
          placeholder="Enter personal or work email address"
        />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: 'Please input your Verify Code!',
          },
        ]}
        hasFeedback
        name="verify_code"
        label="Verify code"
      >
        <Input
          variant="underlined"
          style={{ height: '50px', background: '#eff5fb' }}
          placeholder="Enter personal or work email address"
        />
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
  );
};
export default ConfirmNewPasswordForm;
