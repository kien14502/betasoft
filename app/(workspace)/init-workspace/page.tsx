'use client';
import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';
import CreateWorkSpace from './CreateWorkSpace';
import JoinOrganization from './JoinOrganization';

function InitWorkSpacePage() {
  const [action, setAction] = useState<'create' | 'join' | null>(null);

  const RedirectForm = () => (
    <div>
      <div
        style={{
          fontSize: '2.5em',
          fontWeight: 700,
          padding: '5%',
          textAlign: 'center',
        }}
      >
        Already have a Workspace?
      </div>
      <Button
        onClick={() => {
          console.log('hi');
          setAction('create');
        }}
        type="primary"
        style={{
          width: '100%',
          height: '40px',
          borderRadius: '0px',
          fontSize: '16px',
          margin: '10px 0 10px 0',
        }}
      >
        Create Workspace
      </Button>
      <Button
        color="primary"
        variant="outlined"
        htmlType="submit"
        style={{
          width: '100%',
          height: '40px',
          borderRadius: '0px',
          fontSize: '16px',
        }}
        onClick={() => setAction('join')}
      >
        Join Organization
      </Button>
    </div>
  );

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
        <div style={{ width: '100%', margin: 'auto', padding: '10%' }}>
          <div
            style={{
              position: 'relative',
              height: '20vh',
              width: '60%',
              display: 'flex',
              alignItems: 'center',
              margin: 'auto',
            }}
          >
            <Image
              src={'/logo_company.png'}
              alt="logo-company"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              fill
            />
          </div>
          {action == null && <RedirectForm />}
          {action == 'create' && <CreateWorkSpace goToJoin={() => setAction('join')} />}
          {action == 'join' && <JoinOrganization goToCreate={() => setAction('create')} />}
        </div>
      </Col>
    </Row>
  );
}

export default InitWorkSpacePage;
