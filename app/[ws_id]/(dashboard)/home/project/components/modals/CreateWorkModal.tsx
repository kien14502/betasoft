import { usePostAuthTasks } from '@/app/api/task/task';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { useContext } from 'react';
import UrgencySelector from '../UrgencySelector';
import useDetectPathname from '@/hooks/useDetectPathname';
// import { getAvatarMember, getColorProject } from '@/utils/common';
import { showToast } from '@/utils/toast';
import { MembersProjectContext } from '@/components/providers/MembersProjectProvider';
import { CreateProjectTaskSchemaType } from '@/constants/schemas/workspace-schema';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import InputForm from '@/components/common/form/InputField';
import TextareaForm from '@/components/common/form/TextareaForm';
import SelectForm from '@/components/common/form/SelectForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
  toggle: () => void;
  isOpen: boolean;
};

const CreateWorkModal: React.FC<Props> = ({ toggle, isOpen }) => {
  const idPrj = useDetectPathname(4);
  const { project } = useContext(ProjectContext);
  const form = useForm<CreateProjectTaskSchemaType>({
    defaultValues: {
      priority: 'medium',
      sprint_id: project?.sprint_active?.id,
      project_id: project?.project?.id,
    },
  });
  const { mutate: createTask } = usePostAuthTasks();
  const { members } = useContext(MembersProjectContext);

  const onFinish = (values: CreateProjectTaskSchemaType) => {
    createTask(
      {
        data: {
          ...values,
          project_id: idPrj,
          sprint_id: project?.sprint_active?.id ?? '',
        },
      },
      {
        onSuccess({ message }) {
          showToast(message ?? '', 'success');
        },
      },
    );
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-b border-[#C7C7CC] !py-6 !px-8">
          <p className="text-[#0045AC] text-2xl font-semibold">NEW TASK</p>
          <span className="text-[#787878] text-sm font-normal">
            Required fields are marked with an asterisk
            <span className="text-[#F20005]">*</span>
          </span>
        </div>
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
          <form onSubmit={form.handleSubmit(onFinish)} className="!py-5 !px-8">
            <InputForm control={form.control} name={'title'} label="Title" />
            <TextareaForm control={form.control} name={'description'} label="Description" />
            <div className="w-full grid grid-cols-2 gap-8">
              <SelectForm control={form.control} name={'list_id'} options={[]} label="Status" />
              <SelectForm control={form.control} name={'assignee'} options={[]} label="Assignee" />
            </div>
            <UrgencySelector />
          </form>
          <div className="border-t border-[#C7C7CC] flex items-center justify-end gap-4 !py-6 !px-8">
            <Button onClick={toggle} type="button" variant="ghost">
              Cancel
            </Button>
            <Button type="submit">Create task</Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateWorkModal;
