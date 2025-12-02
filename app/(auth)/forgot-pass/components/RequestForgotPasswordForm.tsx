import { usePostForgotPassword } from '@/app/api/users/users';
import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  requestForgotPasswordSchema,
  RequestForgotPasswordSchemaType,
} from '@/constants/schemas/password-schema';
import { showToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Props = {
  step: number;
  setStep: () => void;
};

const RequestForgotPasswordForm: React.FC<Props> = ({ setStep, step }) => {
  const { mutate, isPending } = usePostForgotPassword();
  const form = useForm<RequestForgotPasswordSchemaType>({
    defaultValues: {
      email: '',
      new_password: '',
      confirmNewPassword: '',
      verify_code: '',
      step: step,
    },
    resolver: zodResolver(requestForgotPasswordSchema),
  });

  const onFinish = (values: RequestForgotPasswordSchemaType) => {
    mutate(
      {
        data: {
          email: values.email,
          step: step,
        },
      },
      {
        onSuccess({ message }) {
          showToast(message!, 'success');
          setStep();
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFinish)}>
        <InputForm control={form.control} name={'email'} />
        <Button type="submit">Send Reset Link</Button>
      </form>
    </Form>
  );
};
export default RequestForgotPasswordForm;
