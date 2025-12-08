import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCopy } from '@/hooks/useCoppy';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { inviteMemberSchema, InviteMemberSchemaType } from '@/constants/schemas/workspace-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '../common/form/InputField';
import { useInviteMember } from '@/services/workspace-service';
import { showToast } from '@/utils/toast';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';

type Props = {
  isCollapse: boolean;
};

const InviteMemberModal = ({ isCollapse }: Props) => {
  const { info } = useAppSelector(getSelector('workspace'));
  const { copied, copy } = useCopy();
  const { mutate: addMember, isPending } = useInviteMember();

  const form = useForm<InviteMemberSchemaType>({
    defaultValues: { email: '', org_id: info?.id },
    resolver: zodResolver(inviteMemberSchema),
  });

  const onSubmit = (values: InviteMemberSchemaType) => {
    addMember(values, {
      onSuccess: () => {
        showToast('Invite successfull', 'success');
        form.reset();
        form.setFocus('email');
      },
    });
  };

  useEffect(() => {
    form.setValue('org_id', info?.id || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center gap-2 text-xs cursor-pointer">
          <Image src={'/icons/invite-member.svg'} width={20} height={20} alt="" />
          {!isCollapse && 'Invite'}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] py-8 px-16 rounded-xl gap-8">
        <DialogHeader>
          <DialogTitle className="text-center text-blue-5">Invite</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="bg-blue-1 p-4 rounded flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Invite by code</p>
            <p className="text-sm text-gray-4">
              Share this code to invite member to this workspace
            </p>
          </div>
          <div className="flex items-center justify-between">
            {info?.id.slice(6)}{' '}
            <Button variant={'outline'} size={'sm'} onClick={() => copy(info?.id || '')}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
            <InputForm
              placeholder="e.g sombody@example.com"
              control={form.control}
              name="email"
              label="Invite by email"
            />
            <div className="flex items-center gap-4 justify-end">
              <DialogClose asChild>
                <Button size={'xl'} variant={'ghost'} className="text-blue-4">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isPending} size={'xl'}>
                {isPending && <Loader className="animate-spin" />} Send invite
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;
