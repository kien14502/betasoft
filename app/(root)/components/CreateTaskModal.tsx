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
import { useGetMemberProject } from '@/services/project';
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
      sprint_id: '',
      project_id: '',
      priority: 'medium',
    },
  });
  const { mutate: createTask } = useCreateTask(() => {
    setOpenModal(false);
    form.reset();
  });

  useEffect(() => {
    form.reset({
      title: '',
      list_id: '',
      sprint_id: '',
      priority: 'medium',
      project_id: prjSelected?.project.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prjSelected]);

  const { data: status } = useGetTaskSections(form.watch('project_id'));
  const { data: members } = useGetMemberProject(form.watch('project_id'));

  const listOptions = useMemo(() => {
    const options = status?.map((item) => ({
      label: item.name ?? '',
      color: item.color ?? '',
      value: item.id ?? '',
    }));
    return options ?? [];
  }, [status]);

  const memberOptions = useMemo(() => {
    return members?.members.map((item) => {
      const mem = item.member;
      return {
        label: mem?.full_name ?? '',
        value: mem?.id ?? '',
        avatar: mem?.profile_image || '/icons/user-circle.svg',
      };
    });
  }, [members]);

  const onSubmit = (values: CreateProjectTaskSchemaType) => {
    createTask(values);
  };

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
                value={form.watch('list_id', '') || ''}
              />
            </div>
            <InputForm control={form.control} name={'title'} label="Title" />
            <TextareaForm control={form.control} name={'description'} label="Description" />
            <div className="grid grid-cols-2 gap-6">
              <SingleSelect
                options={memberOptions ?? []}
                onChange={({ value }) => form.setValue('assignee', value)}
                renderItem={(item) => (
                  <div className="flex items-center gap-2 justify-center">
                    <Image
                      width={24}
                      height={24}
                      className="object-center"
                      src={item.avatar}
                      alt={item.label}
                    />
                    <span className="text-xs">{item.label}</span>
                  </div>
                )}
                trigger={'Assignee'}
                label={'Assignee'}
                value={form.watch('assignee', '') ?? ''}
                prefix={<UserRound size={24} />}
                classNames={{ trigger: 'h-12' }}
              />
            </div>
            <UrgencySelector
              value={form.watch('priority')}
              onChange={(value) => form.setValue('priority', value)}
            />
            <div className="gap-6 flex items-center justify-end w-full">
              <Button size={'xl'} className="text-blue-4" variant={'ghost'} type="button">
                Cancel
              </Button>
              <Button size={'xl'} type="submit" variant={'active'}>
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
