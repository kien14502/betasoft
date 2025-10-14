import React from 'react';
import { Card, Row, Col } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import LaunchApp from './components/LaunchApps';

const WelcomePage: React.FC = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '60vh' }}>
      <Col span={12}>
        <Card
          style={{
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <SmileOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          <h2>Hello there!</h2>
          <p style={{ fontSize: '18px' }}>
            We&apos;re glad to have you here. Start exploring the features of our amazing app.
          </p>
          <br />
          <LaunchApp />
        </Card>
      </Col>
    </Row>
  );
};

export default WelcomePage;
