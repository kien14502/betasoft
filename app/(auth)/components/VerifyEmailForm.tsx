'use client';

import OtpInputForm from '@/components/common/form/OtpInputForm';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { verifyOtpSchema, VerifyOtpSchema } from '@/constants/schemas/register-schem';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import CreatePassword from './CreatePassword';
import { useState } from 'react';
import { useAuthRegister } from '@/services/auth-service';
import ResendEmail from './ResendEmail';

type Props = {
  email: string;
};

const VerifyEmailForm = ({ email }: Props) => {
  const [view, setView] = useState<'otp' | 'confirm'>('otp');
  const { mutate: register, isPending: isRegisterLoading } = useAuthRegister();

  const form = useForm<VerifyOtpSchema>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { code: '', email, step: 2 },
  });

  const onVerify = (values: VerifyOtpSchema) => {
    register(
      {
        email: values.email,
        step: values.step,
        verify_code: values.code,
      },
      {
        onSuccess({ data }) {
          if (data) {
            setView('confirm');
          }
        },
      },
    );
  };

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
      <ResendEmail email={email} />
    </div>
  );
};
export default VerifyEmailForm;
