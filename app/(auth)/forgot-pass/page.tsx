'use client';

import { useState } from 'react';
import RequestForgotPasswordForm from './components/RequestForgotPasswordForm';
import { Row, Col, Card } from 'antd';
import ConfirmNewPasswordForm from './components/ConfirmNewPasswordForm';

function ForgotPassPage() {
  const [step, setStep] = useState<1 | 2>(1);

  const stepToggle = () => (1 ? setStep(2) : setStep(1));

  const formForgotPassword = () => {
    switch (step) {
      case 2:
        return <ConfirmNewPasswordForm step={step} />;
      default:
        return <RequestForgotPasswordForm step={step} setStep={stepToggle} />;
    }
  };

  return (
    <Row justify="center">
      <Col
        xs={24}
        sm={20}
        md={16}
        lg={12}
        xl={10}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Card
          style={{
            width: '85%',
            margin: 'auto',
            borderRadius: 0,
            padding: '5%',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: '3em',
              fontWeight: 700,
              marginBottom: '10px',
            }}
          >
            Forgotten your password?
          </div>
          <p style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 400 }}>
            There is nothing to worry about, we&apos;ll send you a message to help you reset your
            password.
          </p>
          {formForgotPassword()}
        </Card>
      </Col>
    </Row>
  );
}

export default ForgotPassPage;
