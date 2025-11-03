import { DateRangePicker } from '@/components/common/date-range-picker';
import MultipleSelect from '@/components/common/MultipleSelect';
import { MembersProjectContext } from '@/components/providers/MembersProjectProvider';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { Form } from '@/components/ui/form';
import { urgencyOptions, USER_AVATAR_URL } from '@/constants/common';
import { taskFilterSchema, TaskFilterSchema } from '@/constants/schemas/workspace-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useMemo } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

const TaskFilter = () => {
  const form = useForm<TaskFilterSchema>({ resolver: zodResolver(taskFilterSchema) });
  const { project } = useContext(ProjectContext);
  const { members } = useContext(MembersProjectContext);

  const colOptions = useMemo(() => {
    return (
      project?.columns?.map((item) => ({
        label: item.name,
        color: item.color,
        value: item.id ?? '',
      })) ?? []
    );
  }, [project?.columns]);

  const memberOptions = useMemo(() => {
    return (
      members.map((item) => ({
        label: item.member?.full_name || '',
        value: item.member?.id || '',
        avatar: item.member?.profile_image || USER_AVATAR_URL,
      })) ?? []
    );
  }, [members]);

  return (
    <Form {...form}>
      <form className="flex items-center gap-4">
        <MultipleSelect
          placeholder="Status"
          options={colOptions}
          renderItem={(item) => (
            <div
              className="w-fit py-0.5 px-2 rounded text-xs font-medium text-white"
              style={{ backgroundColor: item.color }}
            >
              {item.label}
            </div>
          )}
          onChange={(value) => console.log(value)}
        />
        <MultipleSelect
          isSearch={true}
          placeholder="Assignee"
          options={memberOptions}
          renderItem={(item) => (
            <div className="flex items-center gap-2 text-xs">
              <Image
                src={item.avatar}
                width={24}
                height={24}
                className="object-center rounded-full"
                alt={item.label}
              />
              {item.label}
            </div>
          )}
          onChange={(value) => console.log(value)}
        />
        <DateRangePicker
          classNames={{
            btn: 'rounded-none h-8 shadow-popup!',
          }}
          onUpdate={(values) => console.log(values)}
          initialDateFrom="2023-01-01"
          initialDateTo="2023-12-31"
          align="start"
          locale="en-GB"
          showCompare={false}
        />
        <MultipleSelect
          placeholder="Urgency"
          options={urgencyOptions}
          renderItem={(item) => (
            <div
              style={{ background: item.color.bg }}
              className="w-fit py-1 rounded-xl px-2 flex items-center gap-1.5 text-black text-xs font-medium"
            >
              <item.icon size={14} color={item.color.icon} /> {item.label}
            </div>
          )}
          onChange={(value) => console.log(value)}
        />
        <MultipleSelect
          isSearch
          placeholder="Reporter"
          options={memberOptions}
          renderItem={(item) => (
            <div className="flex items-center gap-2 text-xs">
              <Image
                src={item.avatar}
                width={24}
                height={24}
                className="object-center rounded-full"
                alt={item.label}
              />
              {item.label}
            </div>
          )}
          onChange={(value) => console.log(value)}
        />
      </form>
    </Form>
  );
};
export default TaskFilter;
