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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        padding: '10%',
      }}
    >
      <div style={{ height: '66%', width: '100%' }}>
        <div style={{ fontSize: '30px', fontWeight: 750, paddingBottom: '5%' }}>Login</div>
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <InputForm label="Email Address" control={form.control} name={'email'} />
            <InputForm label="Password" control={form.control} name={'password'} />
            {/* <InputForm
              type="checkbox"
              label="Remember Me"
              control={form.control}
              name={'agreement'}
            /> */}
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Logging in...' : 'Login'}
            </Button>

            <hr style={{ margin: '30px 0 10px 0', border: '1px solid #ecececff' }} />

            <div className="">
              <Link href="/register">No account yet? Sign Up</Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
