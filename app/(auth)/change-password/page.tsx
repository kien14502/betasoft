'use client';
import { usePatchAuthUserPassword } from '@/app/api/users/users';
import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from '@/constants/schemas/password-schema';
import { showToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const ChangePasswordPage = () => {
  const form = useForm<ChangePasswordSchemaType>({
    defaultValues: {
      old_password: '',
      new_password: '',
    },
    resolver: zodResolver(changePasswordSchema),
  });
  const { mutate, isPending } = usePatchAuthUserPassword();
  const navigate = useRouter();

  const onFinish = (values: ChangePasswordSchemaType) =>
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
    <div>
      <div
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
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

          <Form {...form}>
            <InputForm control={form.control} name={'new_password'} />
            <InputForm control={form.control} name={'old_password'} />
            <InputForm control={form.control} name={'confirm_password'} />

            <Button>Confirm</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ChangePasswordPage;
