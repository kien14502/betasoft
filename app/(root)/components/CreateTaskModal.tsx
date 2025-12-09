import SearchProject from '@/components/common/SearchProject';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
  createProjectTaskSchema,
  CreateProjectTaskSchemaType,
} from '@/constants/schemas/workspace-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { memo } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

const CreateTaskModal = ({ openModal, setOpenModal }: Props) => {
  const form = useForm<CreateProjectTaskSchemaType>({
    resolver: zodResolver(createProjectTaskSchema),
    defaultValues: {
      title: '',
      list_id: '',
      sprint_id: '',
      project_id: '',
      priority: 'medium',
    },
  });

  console.log('123');

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
          <form>
            <div className="grid grid-cols-2">
              <SearchProject onChange={(prj) => form.setValue('project_id', prj.project.id)} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default memo(CreateTaskModal);
