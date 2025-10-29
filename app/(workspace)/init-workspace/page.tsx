'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import CreateWorkSpace from './CreateWorkSpace';
import JoinOrganization from './JoinOrganization';
import { Button } from '@/components/ui/button';

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
        onClick={() => setAction('create')}
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
    <div className="grid grid-cols-2">
      <div className="relative h-screen w-full flex items-center">
        <div style={{ width: '100%', margin: 'auto', padding: '10%' }}>
          <div className="relative h-[20vh] w-[60%] flex items-center mx-auto">
            <Image
              src={'/logo_company.png'}
              alt="logo-company"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              fill
            />
          </div>
          {action == null && <RedirectForm />}
          {action == 'create' && <CreateWorkSpace joinWorkspace={() => setAction('join')} />}
          {action == 'join' && <JoinOrganization goToCreate={() => setAction('create')} />}
        </div>
      </div>
    </div>
  );
}

export default InitWorkSpacePage;
