'use client';

import Link from 'next/link';
import { RequestRegisterRequest } from '@/app/api/generated.schemas';
import { Dispatch, SetStateAction } from 'react';
import { usePostAuthRegister } from '@/app/api/auth/auth';
import { showToast } from '@/utils/toast';
import { registerSchema, RegisterSchemaType } from '@/constants/schemas/register-schem';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import CheckboxForm from '@/components/common/form/CheckboxForm';
import { Form } from '@/components/ui/form';

interface RegisterFormProps {
  setDataPayload: Dispatch<SetStateAction<RequestRegisterRequest>>;
}

const RegisterForm = ({ setDataPayload }: RegisterFormProps) => {
  const { mutate, isPending } = usePostAuthRegister();
  const form = useForm<RegisterSchemaType>({
    defaultValues: { email: '', first_name: '', last_name: '' },
    resolver: zodResolver(registerSchema),
  });

  const handleSubmit = (values: RegisterSchemaType) => {
    const payload: RequestRegisterRequest = {
      email: values.email,
      full_name: values.first_name + ' ' + values.last_name,
      step: 1,
    };
    mutate(
      { data: payload },
      {
        onSuccess: (res) => {
          showToast(res.message!, 'success');
          payload.step = 2;
          setDataPayload(payload);
        },
        onError: (err) => {
          console.log(err);
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
        <div style={{ fontSize: '30px', fontWeight: 750, paddingBottom: '5%' }}>Sign Up Free</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-2">
              <InputForm control={form.control} name={'first_name'} label="First Name" />
              <InputForm control={form.control} name={'last_name'} label="Last Name" />
            </div>
            <InputForm control={form.control} name={'email'} label="Email" />
            <CheckboxForm
              control={form.control}
              name={'agreement'}
              label="Agree to the terms of use and acknowledge that you have read our privacy policy, which
              describes how we collect, use, store, and share your data."
            />
            <Button type="submit">Sign Up</Button>
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

export default RegisterForm;
