'use client';

import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  const { Paragraph } = Typography;

  return (
    <Result
      status="error"
      title="Submission Failed"
      subTitle="Please check and modify the following information before resubmitting."
      extra={[
        <Button type="primary" key="console">
          Go Console
        </Button>,
        <Button key="buy" onClick={() => reset()}>
          Try Again
        </Button>,
      ]}
    >
      <div className="desc">
        <Paragraph>
          <p
            style={{
              fontSize: 16,
            }}
          >
            {error.message}
          </p>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
          frozen. <a>Thaw immediately &gt;</a>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet
          eligible to apply. <a>Apply Unlock &gt;</a>
        </Paragraph>
      </div>
    </Result>
  );
}
