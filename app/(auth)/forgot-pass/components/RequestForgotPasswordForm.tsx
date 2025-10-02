import { RequestForgotPasswordRequest } from '@/app/api/generated.schemas';
import { usePostForgotPassword } from '@/app/api/users/users';
import { showToast } from '@/app/utils/toast';
import { Form, Input, Button } from 'antd';

type Props = {
  step: number;
  setStep: () => void;
};

const RequestForgotPasswordForm: React.FC<Props> = ({ setStep, step }) => {
  const { mutate, isPending } = usePostForgotPassword();
  const [form] = Form.useForm();

  const onFinish = (values: RequestForgotPasswordRequest) => {
    mutate(
      {
        data: {
          email: values.email,
          step: step,
        },
      },
      {
        onSuccess({ message }) {
          console.log(message);
          showToast(message!, 'success');
          setStep();
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
          Send Reset Link
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RequestForgotPasswordForm;
