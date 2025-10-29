'use client';
import React from 'react';
import { usePostAuthOrganizations } from '@/app/api/organizations/organizations';
import { RequestCreateOrganizationRequest } from '@/app/api/generated.schemas';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
import {
  createWorkspaceSchema,
  CreateWorkSpaceSchemaType,
} from '@/constants/schemas/workspace-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import RadioGroupForm from '@/components/common/form/RadioGroupForm';
import { Form } from '@/components/ui/form';
import { WORKSPACE_SIZE_OPTIONS } from '@/constants/common';
interface CreateWorkSpaceProps {
  joinWorkspace?: () => void;
}

const CreateWorkSpace = ({ joinWorkspace }: CreateWorkSpaceProps) => {
  const { mutate } = usePostAuthOrganizations();
  const router = useRouter();
  const form = useForm<CreateWorkSpaceSchemaType>({
    defaultValues: { name: '', size: '' },
    resolver: zodResolver(createWorkspaceSchema),
  });

  const onFinish = (values: CreateWorkSpaceSchemaType) => {
    const payload: RequestCreateOrganizationRequest = {
      name: values.name,
      size: Number(values.size),
    };
    mutate(
      { data: payload },
      {
        onSuccess: (res) => {
          showToast(res.message!, 'success');
          router.push('/workspace');
        },
      },
    );
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
        Create Workspace
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)}>
          <InputForm control={form.control} name="name" label="Workspace name" />
          <RadioGroupForm control={form.control} name="size" options={WORKSPACE_SIZE_OPTIONS} />
          <Button type="submit">Continue</Button>
          <Button type="button" onClick={joinWorkspace}>
            Join Organization
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateWorkSpace;
