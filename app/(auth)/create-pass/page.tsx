'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import InputForm from '@/components/common/form/InputField';
import {
  createPasswordSchema,
  CreatePasswordSchemaType,
} from '@/constants/schemas/password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

function CreatePass() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<CreatePasswordSchemaType>({
    defaultValues: {
      confirm_password: '',
      password: '',
    },
    resolver: zodResolver(createPasswordSchema),
  });

  const onSubmit = (values: CreatePasswordSchemaType) => {
    setLoading(true);
    // createPass(values as string);
    setTimeout(() => setLoading(false), 2000);
  };

  const createPass = async (values: string) => {
    setLoading(true);
    setLoading(false);
    router.push('./init-workspace');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
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
          <div>
            <div
              style={{
                fontSize: '2.5em',
                fontWeight: 700,
                padding: '5%',
                textAlign: 'center',
              }}
            >
              Create Password
            </div>
            <Form {...form}>
              <InputForm control={form.control} name={'password'} label="Password" />
              <InputForm
                control={form.control}
                name={'confirm_password'}
                label="Confirm password"
              />

              <Button type="submit">Continue</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePass;
