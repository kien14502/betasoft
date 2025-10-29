import { usePostAuthRegister } from '@/app/api/auth/auth';
import { RequestRegisterRequest } from '@/app/api/generated.schemas';
import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { verifyCodeSchema, VerifyCodeSchemaType } from '@/constants/schemas/register-schem';
import { showToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

interface IVerifyCodeProps {
  data: RequestRegisterRequest;
  setData: Dispatch<SetStateAction<RequestRegisterRequest>>;
}

const VerifyCode = ({ data, setData }: IVerifyCodeProps) => {
  const { mutate, isPending } = usePostAuthRegister();
  const { mutate: resendMutate, isPending: isPendingReSend } = usePostAuthRegister();
  const form = useForm<VerifyCodeSchemaType>({
    defaultValues: { code: '' },
    resolver: zodResolver(verifyCodeSchema),
  });

  const handleSubmit = (values: VerifyCodeSchemaType) => {
    const payload: RequestRegisterRequest = {
      ...data,
      verify_code: values.code,
      step: 2,
    };
    mutate(
      { data: payload },
      {
        onSuccess: (res) => {
          showToast(res.message!, 'success');
          payload.step = 3;
          setData(payload);
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };

  const resend = () => {
    const payload: RequestRegisterRequest = {
      ...data,
      step: 1,
    };
    resendMutate(
      { data: payload },
      {
        onSuccess: (res) => {
          showToast(res.message!, 'success');
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
        <div style={{ fontSize: '30px', fontWeight: 750, paddingBottom: '5%' }}>
          Verify Code from Email
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputForm control={form.control} name="code" label="Verify Code" />
            <Button type="submit">Verify</Button>
          </form>

          <hr style={{ margin: '30px 0 10px 0', border: '1px solid #ecececff' }} />

          {/* Link to Login Page */}
          <div>
            <div>
              {isPendingReSend ? (
                <span>Resending...</span>
              ) : (
                <a onClick={resend} style={{ cursor: 'pointer' }}>
                  Resend?
                </a>
              )}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="/login">Already have an account?</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerifyCode;
