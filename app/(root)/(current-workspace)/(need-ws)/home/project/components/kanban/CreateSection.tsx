import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CornerDownRight, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ColorPicker from '@/components/common/ColorPicker';
import { taskSectionSchema, TaskSectionSchema } from '@/constants/schemas/workspace-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { useCreateTaskSection } from '@/services/task-service';
import { useCallback, useEffect } from 'react';
import { COLORS } from '@/utils/common';

type Props = {
  taskPosition: number;
  onScrollRight: () => void;
};

const CreateSection = ({ taskPosition, onScrollRight }: Props) => {
  const pathName = usePathname().split('/').filter(Boolean);
  const { mutate: createTaskSection } = useCreateTaskSection();
  const form = useForm<TaskSectionSchema>({
    defaultValues: {
      name: '',
      description: '',
      project_id: pathName[2],
      color: COLORS[0],
    },
    resolver: zodResolver(taskSectionSchema),
  });

  useEffect(() => {
    form.reset({
      name: '',
      position: taskPosition + 1,
      description: '',
      project_id: pathName[2],
      color: COLORS[0],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskPosition]);

  const onSubmit = useCallback(
    (values: TaskSectionSchema) => {
      createTaskSection(values, {
        onSuccess: () => {
          onScrollRight();
          form.reset();
        },
      });
    },
    [createTaskSection, onScrollRight, form],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="shadow-secondary rounded-xl" variant={'secondary'} size={'icon-lg'}>
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-1 border sm:max-w-[400px]">
        <Form {...form}>
          <form className="flex items-center gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <ColorPicker onColorChange={(value) => form.setValue('color', value)} />
            <input
              placeholder="Status name"
              className="outline-none text-sm font-medium flex-1"
              {...form.register('name')}
            />
            {form.formState.isValid && (
              <Button type="submit" disabled={!form.formState.isValid} size={'icon-sm'}>
                <CornerDownRight />
              </Button>
            )}
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
export default CreateSection;
