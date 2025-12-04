'use client';

import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { InviteMemberSchemaType } from '@/constants/schemas/workspace-schema';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { useInviteMember } from '@/services/workspace-service';
import { useForm } from 'react-hook-form';

const InviteMember = () => {
  const { info } = useAppSelector(getSelector('workspace'));
  const form = useForm<InviteMemberSchemaType>({
    defaultValues: { email: '', org_id: info?.id },
  });
  const { mutate: addMember, isPending } = useInviteMember();

  const onSubmit = (values: InviteMemberSchemaType) => {
    addMember(values);
  };

  return (
    <Dialog>
      <DialogTrigger>Add member</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputForm control={form.control} name="email" />
            <Button>Invite</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default InviteMember;
