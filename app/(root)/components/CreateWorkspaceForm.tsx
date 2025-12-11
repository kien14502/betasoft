'use client';

import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { wsSizeOptions } from '@/constants';
import { newWorkSpaceSchema, NewWorkSpaceSchemaType } from '@/constants/schemas/workspace-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import UploadIcon from './UploadIcon';
import Image from 'next/image';
import CompanySize from './CompanySize';
import { usePostAuthOrganizations } from '@/app/api/organizations/organizations';
import { showToast } from '@/utils/toast';
import { isFormReady } from '@/utils/common';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/useRedux';
import { launchWorkspaceUser } from '@/lib/features/auth/actions';

const CreateWorkspaceForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate: createWorkspace, isPending } = usePostAuthOrganizations();
  const form = useForm<NewWorkSpaceSchemaType>({
    resolver: zodResolver(newWorkSpaceSchema),
    defaultValues: {
      name: '',
      //   industry: '',
      size: 50,
    },
  });

  const onSubmit = (values: NewWorkSpaceSchemaType) => {
    createWorkspace(
      {
        data: {
          name: values.name,
          avatar: values.avatar,
          size: values.size,
        },
      },
      {
        onSuccess({ message, data }) {
          dispatch(launchWorkspaceUser(data?.id ?? ''))
            .unwrap()
            .then(() => {
              router.replace('/home/overview');
            });
          showToast(message || 'Create workspace successfully', 'success');
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-12" onSubmit={form.handleSubmit(onSubmit)}>
        <UploadIcon onFileSelect={(url) => form.setValue('avatar', url || '')} />
        <InputForm
          prefix={<Image src={'/icons/team.svg'} width={24} height={24} alt="" />}
          control={form.control}
          name="name"
          label="Company Name"
          placeholder="Enter name"
        />
        <CompanySize
          control={form.control}
          name="size"
          label="Company Size"
          options={wsSizeOptions}
        />
        <Button
          variant={!isFormReady(form) ? 'active' : 'default'}
          disabled={isFormReady(form) || isPending}
          size={'xl'}
        >
          {isPending && <Loader className="animate-spin" />}
          Create New Workspace
        </Button>
      </form>
    </Form>
  );
};
export default CreateWorkspaceForm;
