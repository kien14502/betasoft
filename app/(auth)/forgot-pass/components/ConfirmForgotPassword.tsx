'use client';

import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import {
  requestForgotPasswordSchema,
  RequestForgotPasswordSchemaType,
} from '@/constants/schemas/password-schema';
import { useForgotPassword } from '@/services/auth-service';
import { showToast } from '@/utils/toast';

type ForgotPasswordFormType = Pick<RequestForgotPasswordSchemaType, 'email' | 'step'>;

type Props = {
  onSetView: (view: 'confirm' | 'code' | 'done') => void;
  setEmail: (email: string) => void;
};

const ConfirmForgotPassword = ({ onSetView, setEmail }: Props) => {
  const form = useForm<ForgotPasswordFormType>({
    defaultValues: { email: '', step: 1 },
    resolver: zodResolver(requestForgotPasswordSchema.pick({ email: true, step: true })),
  });

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onSubmit = (values: ForgotPasswordFormType) => {
    forgotPassword(values, {
      onSuccess: ({ message }) => {
        showToast(message, 'success');
        onSetView('code');
        setEmail(form.watch('email'));
      },
    });
  };

  const isActive = !form.formState.isValid || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)}>
        <InputForm
          placeholder="Enter your email here"
          control={form.control}
          name="email"
          label="Email"
          required
          prefix={<Image width={24} height={24} src={'/icons/email.svg'} alt="" />}
        />

        <Button
          isLoading={isPending}
          disabled={isActive}
          size={'xl'}
          variant={!isActive ? 'active' : 'default'}
        >
          Submit Now
        </Button>
      </form>
    </Form>
  );
};
export default ConfirmForgotPassword;
