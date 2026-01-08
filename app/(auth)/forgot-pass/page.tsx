'use client';

import Link from 'next/link';
import ConfirmForgotPassword from './components/ConfirmForgotPassword';
import { useState } from 'react';
import VerifyCode from './components/VerifyCode';
import SuccessView from './components/SuccessView';

type View = 'confirm' | 'code' | 'done';

function ForgotPassPage() {
  const [view, setView] = useState<View>('confirm');
  const [email, setEmail] = useState<string>('');

  return (
    <>
      {view === 'confirm' && (
        <>
          <Title
            subTitle="A code will be sent to your email to help reset password."
            title="Forgot Password"
          />
          <ConfirmForgotPassword onSetView={setView} setEmail={setEmail} />
        </>
      )}
      {view === 'code' && (
        <>
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <p className="text-[40px] font-medium">Check Your Email</p>
            <div className="flex flex-col items-start gap-1">
              <span className="text-gray-4">Enter the verification code sent to:</span>
              <span className="font-semibold">{email}</span>
            </div>
          </div>
          <VerifyCode email={email} setView={setView} />
        </>
      )}
      {view === 'done' && <SuccessView />}
      {view !== 'code' && (
        <div className="flex items-center gap-1 justify-center text-sm">
          <span>Back to</span>
          <Link href={'/login'} className="text-blue-4!">
            Login
          </Link>
        </div>
      )}
    </>
  );
}

export default ForgotPassPage;

const Title = ({ title, subTitle }: { title: string; subTitle: string }) => (
  <div className="flex flex-col gap-2">
    <p className="text-[40px] font-medium">{title}</p>
    <span className="text-xs text-gray-4">{subTitle}</span>
  </div>
);
