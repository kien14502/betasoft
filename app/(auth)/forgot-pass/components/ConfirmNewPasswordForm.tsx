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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Props = {
  step: number;
};

const ConfirmNewPasswordForm: React.FC<Props> = ({ step }) => {
  const { replace } = useRouter();
  const { mutate } = usePostForgotPassword();
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

  const onSubmit = (values: RequestForgotPasswordSchemaType) => {
    mutate(
      { data: values },
      {
        onSuccess({ message }) {
          showToast(message!, 'success');
          replace('/login');
        },
      },
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputForm control={form.control} name={'email'} />
        <InputForm type={'password'} control={form.control} name={'new_password'} />
        <InputForm type={'password'} control={form.control} name={'confirmNewPassword'} />
        <InputForm control={form.control} name={'verify_code'} />
        <Button type="submit">Confirm</Button>
      </form>
    </Form>
  );
};
export default ConfirmNewPasswordForm;
