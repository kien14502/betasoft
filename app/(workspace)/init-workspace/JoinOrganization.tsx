import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { VerifyCodeSchemaType } from '@/constants/schemas/register-schem';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface JoinWorkSpaceProps {
  goToCreate: () => void;
}

const JoinOrganization = ({ goToCreate }: JoinWorkSpaceProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<VerifyCodeSchemaType>();

  const onFinish = (values: VerifyCodeSchemaType) => {
    setLoading(true);
    console.log('Received values:', values);
    setTimeout(() => setLoading(false), 2000); // Simulate API call
  };
  return (
    <div>
      <div
        style={{
          fontSize: '2.5em',
          fontWeight: 700,
          width: '100%',
          textAlign: 'center',
          margin: '10% 0 10% 0',
        }}
      >
        Join Organization
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)}>
          <InputForm label="Enter code" control={form.control} name={'code'} />
          <Button type="submit">Continue</Button>
          <Button onClick={goToCreate} type="button">
            Create Workspace
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JoinOrganization;
