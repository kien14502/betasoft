import { ButtonTooltip } from '@/components/common/ButtonTooltip';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { Button } from '@/components/ui/button';
import {
  CreateProjectTaskSchemaType,
  createProjectTaskSchema,
} from '@/constants/schemas/workspace-schema';
import { useToggle } from '@/hooks/useToggle';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleDashed, CornerDownRight, Flag, UserCircle, X } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

const AddSubtask = () => {
  // TODO
  const [open, { toggle }] = useToggle();
  const { project } = useContext(ProjectContext);
  const form = useForm<CreateProjectTaskSchemaType>({
    resolver: zodResolver(createProjectTaskSchema),
    defaultValues: {
      title: '',
      list_id: '',
      sprint_id: project?.sprint_active?.id || '',
      project_id: project?.project?.id || '',
      priority: 'medium',
    },
  });
  return (
    <div>
      {!open ? (
        <Button
          variant={'ghost'}
          onClick={toggle}
          className="w-fit bg-blue-1 text-blue-5 py-1.5 px-3 rounded-[8px]"
        >
          <CornerDownRight size={20} />
          Add Sub-task
        </Button>
      ) : (
        <div className="w-full flex items-center gap-1 p-2 rounded border shadow-secondary">
          <ButtonTooltip content="Status" variant={'ghost'} size={'icon-xs'}>
            <CircleDashed />
          </ButtonTooltip>
          <input placeholder="Name subtask" className="outline-none flex-1 text-sm font-medium" />
          <ButtonTooltip content="Priority" variant={'outline'} size={'icon-xs'}>
            <Flag />
          </ButtonTooltip>
          <ButtonTooltip content="Assignee" variant={'outline'} size={'icon-xs'}>
            <UserCircle />
          </ButtonTooltip>
          <ButtonTooltip content="Close" variant={'destructive'} size={'icon-xs'} onClick={toggle}>
            <X />
          </ButtonTooltip>
        </div>
      )}
    </div>
  );
};
export default AddSubtask;
