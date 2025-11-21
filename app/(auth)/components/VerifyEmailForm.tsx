'use client';
import { usePostAuthRegister } from '@/app/api/auth/auth';
import OtpInputForm from '@/components/common/form/OtpInputForm';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { verifyOtpSchema, VerifyOtpSchema } from '@/constants/schemas/register-schem';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import CreatePassword from './CreatePassword';
import { useState } from 'react';

type Props = {
  email: string;
};

const VerifyEmailForm = ({ email }: Props) => {
  const [view, setView] = useState<'otp' | 'confirm'>('otp');
  const { mutate: register, isPending: isRegisterLoading } = usePostAuthRegister();

  const form = useForm<VerifyOtpSchema>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { code: '', email, step: 2 },
  });

  const onVerify = (values: VerifyOtpSchema) => {
    register(
      {
        data: {
          email: values.email,
          step: values.step,
          verify_code: values.code,
        },
      },
      {
        onSuccess() {
          setView('confirm');
        },
      },
    );
  };

  const onResendVerify = () => {};

  const isActive = !form.formState.isValid || form.formState.isSubmitting;

  if (view === 'confirm') return <CreatePassword code={form.getValues('code')} email={email} />;

  return (
    <div className="flex flex-col gap-16">
      <p className="text-[40px] font-medium text-center">Verify Email Address</p>
      <div className="flex items-center flex-col">
        <span className="text-gray-4">Enter the verification code sent to:</span>
        <p className="font-semibold text-start">{email}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onVerify)} className="flex flex-col gap-16 items-center">
          <OtpInputForm control={form.control} name="code" />
          <Button
            disabled={isActive || isRegisterLoading}
            type="submit"
            className="w-full"
            variant={!isActive ? 'active' : 'default'}
            size={'xl'}
          >
            {isRegisterLoading && <Loader className="animate-spin" size={20} />}
            Continue
          </Button>
        </form>
      </Form>
      <div className="flex items-center gap-1 text-sm justify-center">
        You did not receive the code?
        <button onClick={onResendVerify} className="text-blue-4">
          Resend code
        </button>
      </div>
    </div>
  );
};
export default VerifyEmailForm;
