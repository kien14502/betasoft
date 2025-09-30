import React from 'react';
import LoginForm from './LoginForm';
import { Col, Row } from 'antd';
import Image from 'next/image';

function LoginPage() {
  return (
    <Row>
      <Col span={12} style={{ position: 'relative', height: '100vh', width: '100%' }}>
        {/* <Image
          src="/logo_register.png"
          alt="logo_register"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        /> */}
      </Col>
      <Col span={12}>
        <LoginForm />
      </Col>
    </Row>
  );
}

export default LoginPage;
