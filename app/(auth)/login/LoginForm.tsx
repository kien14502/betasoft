'use client';

import Link from 'next/link';
import { usePostLogin } from '@/app/api/users/users';
import { useRouter } from 'next/navigation';
import { EToken } from '@/constants';
import { saveAuthStorage } from '@/utils/authStorage';
import { setClientCookie } from '@/utils/cookie.client';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchemaType } from '@/constants/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import InputForm from '@/components/common/form/InputField';
import RememberAccount from '../components/RememberAccount';
import GoogleButton from '../components/GoogleButton';

export default function Login() {
  const { mutate, isPending } = usePostLogin();
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: '',
      password: '',
      agreement: false,
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginSchemaType) => {
    mutate(
      { data: values },
      {
        onSuccess: (res) => {
          const token = res.data?.token || '';
          setClientCookie(EToken.ACCESS_TOKEN, token);
          saveAuthStorage('USER_DATA', res.data?.user || {});
          router.push('/');
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <InputForm label="Email" control={form.control} name={'email'} />
        <InputForm type="password" label="Password" control={form.control} name={'password'} />
        <div className="flex items-center justify-between">
          <RememberAccount />
          <Link className="text-sm text-blue-4!" href={''}>
            Forgot password?
          </Link>
        </div>
        <Button size={'xl'} type="submit" variant={'active'} disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
        <GoogleButton />
        <div className="flex items-center text-sm justify-center gap-1">
          <span>Do not have an account?</span>
          <Link className="text-blue-4!" href="/register">
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
}
