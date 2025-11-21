import React from 'react';
import LoginForm from './LoginForm';

function LoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-[40px] font-medium">Welcome back,</p>
        <span className="text-xs text-gray-4">Welcome back, please enter your details.</span>
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
