'use client';
import { usePostAuthRegister } from '@/app/api/auth/auth';
import { RequestRegisterRequest } from '@/app/api/generated.schemas';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { EToken } from '@/constants';
import { saveAuthStorage } from '@/utils/authStorage';
import { setClientCookie } from '@/utils/cookie.client';
import { showToast } from '@/utils/toast';
import { useForm } from 'react-hook-form';
import {
  createPasswordSchema,
  CreatePasswordSchemaType,
} from '@/constants/schemas/password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';

interface ICreatePassProps {
  data: RequestRegisterRequest;
  setData: Dispatch<SetStateAction<RequestRegisterRequest>>;
}

const CreatePass = ({ data, setData }: ICreatePassProps) => {
  const { mutate, isPending } = usePostAuthRegister();
  const router = useRouter();
  const form = useForm<CreatePasswordSchemaType>({
    defaultValues: { password: '', confirm_password: '' },
    resolver: zodResolver(createPasswordSchema),
  });

  const handleSubmit = (values: CreatePasswordSchemaType) => {
    const payload: RequestRegisterRequest = {
      ...data,
      password: values.password,
      step: 3,
    };
    mutate(
      { data: payload },
      {
        onSuccess: async (res) => {
          showToast(res.message!, 'success');
          data.step = 3;
          setData(data);
          setClientCookie(EToken.ACCESS_TOKEN, res.data?.token || '');
          saveAuthStorage('USER_DATA', res.data?.user || {});
          console.log('accessToken', res.data);
          router.push('./init-workspace');
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
        <div style={{ fontSize: '30px', fontWeight: 750, paddingBottom: '5%' }}>
          Create new password
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputForm control={form.control} name="password" label="New Password" />
            <InputForm
              control={form.control}
              name="confirm_password"
              label="Confirm New Password"
            />
            <Button type="submit">Submit</Button>
          </form>

          <hr style={{ margin: '30px 0 10px 0', border: '1px solid #ecececff' }} />

          <div style={{ textAlign: 'center' }}>
            <Link href="/login">Already have an account?</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreatePass;
