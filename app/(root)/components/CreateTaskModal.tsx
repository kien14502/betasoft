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

  const { mutate: createTask, isPending } = useCreateTask();

  useEffect(() => {
    form.setValue('project_id', prjSelected?.project.id ?? '');
  }, [prjSelected, form]);

  useEffect(() => {
    form.setValue('sprint_id', project?.sprint_active.id ?? '');
  }, [form, project]);

  const projectIdValue = form.watch('project_id');

  useEffect(() => {
    if (!projectIdValue) return;

    form.setValue('list_id', '');
    form.setValue('assignee', '');
  }, [projectIdValue, form]);

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
    createTask(values, {
      onSuccess: () => {
        setOpenModal(false);
        form.reset();
        setPrjSelected(null);
      },
    });
  };

  const handleCancel = () => {
    setOpenModal(false);
    form.reset();
    setPrjSelected(null);
  };

  const isDisable = !form.watch('project_id');

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[728px] p-0 max-h-svh overflow-x-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <DialogHeader className="py-6 px-8 border-b gap-1 flex flex-col">
              <DialogTitle className="text-[#0045AC] text-2xl">New task</DialogTitle>
              <DialogDescription className="flex text-[#787878] items-center gap-1">
                Required fields are marked with an asterisk
                <Image width={6} height={6} alt="Required" src={'/icons/asterisk.svg'} />
              </DialogDescription>
            </DialogHeader>

            <div className="px-8 flex flex-col gap-6 w-full">
              <SearchProject onChange={setPrjSelected} />
              <InputForm
                className="max-w-[320px]"
                required
                control={form.control}
                name={'title'}
                label="Title"
                disable={isDisable}
              />
              <TextareaForm
                disabled={isDisable}
                control={form.control}
                name={'description'}
                label="Description"
              />

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
                classNames={{ trigger: 'h-12 max-w-[320px]' }}
                require
                disable={isDisable}
              />
              <div className="grid grid-cols-2 gap-6">
                <SingleSelect
                  disable={isDisable}
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
              <UrgencySelector
                value={form.watch('priority')}
                onChange={(value) => form.setValue('priority', value)}
                isDisable={isDisable}
              />
            </div>

            <div className="gap-6 py-5 px-8 flex items-center justify-end w-full border-t">
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
