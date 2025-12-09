import SearchProject from '@/components/common/SearchProject';
import SingleSelect from '@/components/common/SingleSelect';
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
import { useGetTaskSections } from '@/services/task-service';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { memo, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

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

  const listOptions = useMemo(() => {
    const options = status?.map((item) => ({
      label: item.name ?? '',
      color: item.color ?? '',
      value: item.id ?? '',
    }));
    return options ?? [];
  }, [status]);

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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default memo(CreateTaskModal);
