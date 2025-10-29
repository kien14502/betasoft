'use client';

import React, { useEffect } from 'react';
import {
  useGetAuthOrganizationsOrgId,
  usePostAuthOrganizations,
  usePatchAuthOrganizations,
} from '@/app/api/organizations/organizations';
import { RequestCreateOrganizationRequest } from '@/app/api/generated.schemas';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
import { useForm } from 'react-hook-form';
import { NewWorkSpaceSchemaType } from '@/constants/schemas/workspace-schema';
import { Form } from '@/components/ui/form';
import InputForm from '@/components/common/form/InputField';
import RadioGroupForm from '@/components/common/form/RadioGroupForm';
import { EWorkSpaceIndustry, EWorkSpaceRegion, EWorkspaceSizes } from '@/constants';
import SelectForm from '@/components/common/form/SelectForm';
import { fEnumToArray } from '@/utils/common';
import TextareaForm from '@/components/common/form/TextareaForm';
import { Button } from '@/components/ui/button';

interface INewWorkSpaceProps {
  idWorkSpace?: string;
}

const NewWorkSpace = ({ idWorkSpace }: INewWorkSpaceProps) => {
  const form = useForm<NewWorkSpaceSchemaType>({
    defaultValues: {
      avatar: [],
      name: '',
      size: 0,
    },
  });
  const { mutate, isPending } = usePostAuthOrganizations();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatchAuthOrganizations();
  const router = useRouter();
  const { data, isPending: isPendingGetData } = useGetAuthOrganizationsOrgId(idWorkSpace ?? '', {
    query: {
      enabled: !!idWorkSpace,
      refetchOnMount: 'always',
      select: (response) => response.data,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(data as NewWorkSpaceSchemaType);
    }
  }, [data, form]);

  const onFinish = (values: NewWorkSpaceSchemaType) => {
    const payload: RequestCreateOrganizationRequest = {
      avatar: values.avatar?.[0],
      name: values.name,
      size: values.size,
      industry: values.industry,
      region: values.region,
      description: values.description,
    };

    if (idWorkSpace) {
      return mutateUpdate(
        {
          data: {
            org_id: data?.id || '0',
            ...payload,
          },
        },
        {
          onSuccess: (res) => {
            showToast(res.message!, 'success');
            router.push('/workspace');
          },
          onError: (err) => {
            console.log(err);
          },
        },
      );
    }

    return mutate(
      { data: payload },
      {
        onSuccess: (res) => {
          showToast(res.message!, 'success');
          router.push('/workspace');
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFinish)}>
        <InputForm control={form.control} name="name" label="Workspace Name" />
        <InputForm control={form.control} name="avatar" label="Workspace Avatar" />
        <RadioGroupForm
          control={form.control}
          name="size"
          label="Workspace Size"
          options={fEnumToArray(EWorkspaceSizes)}
        />
        <SelectForm
          control={form.control}
          name={'id'}
          options={fEnumToArray(EWorkSpaceRegion)}
          label="Region"
          placeholder="Select an option"
        />
        <SelectForm
          control={form.control}
          name={'id'}
          options={fEnumToArray(EWorkSpaceIndustry)}
          label="Industry"
          placeholder="Select an option"
        />
        <TextareaForm control={form.control} name="description" label="Description" />
        <Button type="submit">{idWorkSpace ? 'Update Workspace' : 'Create Workspace'}</Button>
      </form>
    </Form>
  );
};

export default NewWorkSpace;
