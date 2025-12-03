import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { useGetListTasks } from '@/services/project-service';
import Image from 'next/image';
import { memo } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

const CreateTaskModal = ({ openModal, setOpenModal }: Props) => {
  const { user } = useAppSelector(getSelector('auth'));
  const { data } = useGetListTasks(user?.meta_data.organization.id || '');
  console.log('data', data);

  const form = useForm();

  const onSubmit = () => {};

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[728px]">
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            Required fields are marked with an asterisk
            <Image width={6} height={6} alt="" src={'/icons/asterisk.svg'} />
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form></form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default memo(CreateTaskModal);
