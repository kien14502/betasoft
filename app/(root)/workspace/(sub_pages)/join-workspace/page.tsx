'use client';

import OtpInputForm from '@/components/common/form/OtpInputForm';
import { Form } from '@/components/ui/form';
import { joinWorkspaceSchema, JoinWorkspaceSchema } from '@/constants/schemas/workspace-schema';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { mergeUrl } from '@/lib/utils';
import { useJoinWorkspace } from '@/services/workspace-service';
import { showToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const JoinWorkspace = () => {
  const { user } = useAppSelector(getSelector('auth'));
  const { mutate: joinWorkspace } = useJoinWorkspace();

  const form = useForm<JoinWorkspaceSchema>({
    defaultValues: { invite_code: '' },
    resolver: zodResolver(joinWorkspaceSchema),
  });

  const onSubmit = (valuse: JoinWorkspaceSchema) => {
    joinWorkspace(valuse, {
      onSuccess() {
        showToast('Join workspace succesfull', 'success');
      },
    });
  };

  return (
    <div className="bg-white max-w-[784px] w-full flex items-center max-h-[688px] h-full flex-col gap-12 rounded-4xl p-16 pt-12 shadow-secondary">
      <p className="text-[40px] font-medium">Join Organization</p>
      <div className="flex flex-col gap-1">
        <span className="text-gray-4">Enter the verification code sent to:</span>
        <span className="font-semibold">{user?.email}</span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <OtpInputForm control={form.control} name="invite_code" />
        </form>
      </Form>
      <Link className="text-sm text-blue-4!" href={mergeUrl(['workspace', 'create-workspace'])}>
        Create Workspace
      </Link>
    </div>
  );
};
export default JoinWorkspace;
