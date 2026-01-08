import OtpInputForm from '@/components/common/form/OtpInputForm';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  requestForgotPasswordSchema,
  RequestForgotPasswordSchemaType,
} from '@/constants/schemas/password-schema';
import { useForgotPassword } from '@/services/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ResendVerifyCode from './ResendVerifyCode';
import InputForm from '@/components/common/form/InputField';

type Props = {
  setView: (view: 'confirm' | 'code' | 'done') => void;
  email: string;
};

const VerifyCode = ({ email, setView }: Props) => {
  const form = useForm<RequestForgotPasswordSchemaType>({
    resolver: zodResolver(requestForgotPasswordSchema),
    defaultValues: { verify_code: '', step: 2, email, confirmNewPassword: '', new_password: '' },
  });

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onSubmit = (values: RequestForgotPasswordSchemaType) => {
    forgotPassword(values, {
      onSuccess: () => {
        setView('done');
      },
    });
  };

  const isActive = !form.formState.isValid || form.formState.isSubmitting;

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col items-center gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <OtpInputForm control={form.control} name={'verify_code'} />
          <InputForm
            className="w-full"
            label="New password"
            control={form.control}
            name="new_password"
            type="password"
          />
          <InputForm
            className="w-full"
            type="password"
            label="Confirm new password"
            control={form.control}
            name="confirmNewPassword"
          />
          <Button
            size={'xl'}
            variant={!isActive ? 'active' : 'default'}
            isLoading={isPending}
            disabled={isActive}
            className="w-full"
            type="submit"
          >
            Verify
          </Button>
        </form>
      </Form>
      <ResendVerifyCode email={email} />
    </>
  );
};
export default VerifyCode;
