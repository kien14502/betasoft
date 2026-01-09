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
import { useAppDispatch } from '@/hooks/useRedux';
import { setAuth } from '@/lib/features/auth/authSlice';
import { User } from '@/interface/auth';
import Image from 'next/image';

export default function Login() {
  const { mutate, isPending } = usePostLogin();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    defaultValues: { email: '', password: '', agreement: false },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginSchemaType) => {
    mutate(
      { data: values },
      {
        onSuccess: (res) => {
          const token = res.data?.token || '';
          setClientCookie(EToken.ACCESS_TOKEN, token);
          dispatch(setAuth(res.data?.user as unknown as User));
          saveAuthStorage('ACCESS_TOKEN', token);
          router.replace('/');
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <InputForm
          prefix={<Image width={24} height={24} src={'/icons/email.svg'} alt="" />}
          label="Email"
          control={form.control}
          name={'email'}
          required={true}
        />
        <InputForm
          prefix={<Image width={24} height={24} src={'/icons/lock.svg'} alt="" />}
          type="password"
          label="Password"
          control={form.control}
          name={'password'}
          required={true}
        />
        <div className="flex items-center justify-between">
          <RememberAccount />
          <Link className="text-sm text-blue-4!" href={'/forgot-pass'}>
            Forgot password
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
