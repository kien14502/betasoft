import { usePostAuthOrganizationsInvite } from '@/app/api/organizations/organizations';
import { showToast } from '@/utils/toast';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { inviteMemberSchema, InviteMemberSchemaType } from '@/constants/schemas/workspace-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import InputForm from '@/components/common/form/InputField';

interface IInviteMemberProps {
  id: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

const InviteMember = ({ id, isModalOpen, setIsModalOpen }: IInviteMemberProps) => {
  const { mutate, isPending } = usePostAuthOrganizationsInvite();
  const form = useForm<InviteMemberSchemaType>({
    resolver: zodResolver(inviteMemberSchema),
  });

  const onFinish = (values: InviteMemberSchemaType) => {
    mutate(
      { data: { org_id: id, email: values.email } },
      {
        onSuccess({ message }) {
          showToast(message ?? 'Invite member successfully', 'success');
          setIsModalOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>Invite member</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFinish)}>
            <InputForm control={form.control} name={'email'} label="Email" />
            <Button type="submit">Invite</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMember;
