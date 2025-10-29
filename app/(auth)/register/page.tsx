'use client';
import React, { useState } from 'react';
import RegisterCard from './RegisterCard';
import Image from 'next/image';
import VerifyCode from './VerifyCode';
import { RequestRegisterRequest } from '@/app/api/generated.schemas';
import CreatePass from './CreatePass';

function Page() {
  const [dataPayload, setDataPayload] = useState<RequestRegisterRequest>({
    email: '',
    step: 1,
  });

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <Image
          src="/logo_register.png"
          alt="logo_register"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </div>
      <div className="col-span-1">
        {dataPayload.step == 1 && <RegisterCard setDataPayload={setDataPayload} />}
        {dataPayload.step == 2 && <VerifyCode data={dataPayload} setData={setDataPayload} />}
        {dataPayload.step == 3 && <CreatePass data={dataPayload} setData={setDataPayload} />}
      </div>
    </div>
  );
}

export default Page;
