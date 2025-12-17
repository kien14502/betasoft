import InputForm from '@/components/common/form/InputField';
import TextareaForm from '@/components/common/form/TextareaForm';
import SearchProject from '@/components/common/SearchProject';
import SingleSelect from '@/components/common/SingleSelect';
import { Button } from '@/components/ui/button';
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
import { ProjectData } from '@/interface/task';
import { useGetMemberProject, useGetProjectIdWithOutKey } from '@/services/project';
import { useCreateTask, useGetTaskSections } from '@/services/task-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRound } from 'lucide-react';
import Image from 'next/image';
import { memo, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import UrgencySelector from '../(current-workspace)/(need-ws)/home/project/components/UrgencySelector';

type Props = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

const CreateTaskModal = ({ openModal, setOpenModal }: Props) => {
  const [prjSelected, setPrjSelected] = useState<ProjectData | null>(null);
  const form = useForm<CreateProjectTaskSchemaType>({
    resolver: zodResolver(createProjectTaskSchema),
    defaultValues: {
      title: '',
      list_id: '',
      project_id: '',
      priority: 'medium',
      description: '',
      assignee: '',
    },
  });

  const projectId = form.watch('project_id');
  const { data: status } = useGetTaskSections(projectId);
  const { data: members } = useGetMemberProject(projectId);
  const { data: project } = useGetProjectIdWithOutKey(projectId);

  const { mutate: createTask, isPending } = useCreateTask(() => {
    setOpenModal(false);
    form.reset();
    setPrjSelected(null);
  });

  useEffect(() => {
    form.setValue('project_id', prjSelected?.project.id ?? '');
  }, [prjSelected, form]);

  useEffect(() => {
    form.setValue('sprint_id', project?.sprint_active.id ?? '');
  }, [form, project]);

  const listOptions = useMemo(() => {
    return (
      status?.map((item) => ({
        label: item.name ?? '',
        color: item.color ?? '',
        value: item.id ?? '',
      })) ?? []
    );
  }, [status]);

  const memberOptions = useMemo(() => {
    return (
      members?.members.map((item) => {
        const mem = item.member;
        return {
          label: mem?.full_name ?? '',
          value: mem?.id ?? '',
          avatar: mem?.profile_image || '/icons/user-circle.svg',
        };
      }) ?? []
    );
  }, [members]);

  const onSubmit = (values: CreateProjectTaskSchemaType) => {
    createTask(values);
  };

  const handleCancel = () => {
    setOpenModal(false);
    form.reset();
    setPrjSelected(null);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[728px]">
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            Required fields are marked with an asterisk
            <Image width={6} height={6} alt="Required" src={'/icons/asterisk.svg'} />
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <SearchProject onChange={setPrjSelected} />
              <SingleSelect
                classNames={{ trigger: 'h-12' }}
                options={listOptions}
                onChange={({ value }) => form.setValue('list_id', value)}
                renderItem={(item) => (
                  <div
                    className="w-fit py-0.5 px-2 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.label}
                  </div>
                )}
                trigger={'Status'}
                label={'Status'}
                value={form.watch('list_id') || ''}
                require
              />
            </div>

            <InputForm required control={form.control} name={'title'} label="Title" />
            <TextareaForm control={form.control} name={'description'} label="Description" />

            <div className="grid grid-cols-2 gap-6">
              <SingleSelect
                options={memberOptions}
                onChange={({ value }) => form.setValue('assignee', value)}
                renderItem={(item) => (
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image fill className="object-cover" src={item.avatar} alt={item.label} />
                    </div>
                    <span className="text-xs">{item.label}</span>
                  </div>
                )}
                trigger={'Assignee'}
                label={'Assignee'}
                value={form.watch('assignee') ?? ''}
                prefix={<UserRound size={24} />}
                classNames={{ trigger: 'h-12' }}
                require
              />
            </div>

            <UrgencySelector
              value={form.watch('priority')}
              onChange={(value) => form.setValue('priority', value)}
            />

            <div className="gap-6 flex items-center justify-end w-full">
              <Button
                size={'xl'}
                className="text-blue-4"
                variant={'ghost'}
                type="button"
                onClick={handleCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                isLoading={isPending}
                size={'xl'}
                type="submit"
                variant={'active'}
                disabled={!projectId || isPending}
              >
                Create Task
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default memo(CreateTaskModal);
