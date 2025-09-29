'use client';
import React, { useEffect, useState } from 'react';
import RegisterCard from './RegisterCard';
import { Col, Row } from 'antd';
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
    <Row>
      <Col span={12} style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <Image
          src="/logo_register.png"
          alt="logo_register"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </Col>
      <Col span={12}>
        {dataPayload.step == 1 && <RegisterCard setDataPayload={setDataPayload} />}
        {dataPayload.step == 2 && <VerifyCode data={dataPayload} setData={setDataPayload} />}
        {dataPayload.step == 3 && <CreatePass data={dataPayload} setData={setDataPayload} />}
      </Col>
    </Row>
  );
}

export default Page;
