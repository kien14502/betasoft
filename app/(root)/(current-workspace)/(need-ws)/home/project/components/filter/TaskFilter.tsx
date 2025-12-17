import { DateRangePicker } from '@/components/common/date-range-picker';
import MultipleSelect from '@/components/common/MultipleSelect';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { urgencyOptions, USER_AVATAR_URL } from '@/constants/common';
import { TaskFilterSchema } from '@/constants/schemas/workspace-schema';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { useGetMemberWorkspace } from '@/services/workspace-service';
import Image from 'next/image';
import { useMemo } from 'react';
import { useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<TaskFilterSchema>;
};

const TaskFilter = ({ form }: Props) => {
  const { project } = useContext(ProjectContext);
  const { info } = useAppSelector(getSelector('workspace'));
  // OPTIMIZE
  const { data: members } = useGetMemberWorkspace(info?.id ?? '');

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
      members?.map((item) => ({
        label: item.full_name,
        value: item.id || '',
        avatar: item.profile_image || USER_AVATAR_URL,
      })) ?? []
    );
  }, [members]);

  return (
    <div className="flex items-center gap-4">
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
        onChange={(value) =>
          form.setValue(
            'label',
            value.map((item) => item.value),
          )
        }
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
        onChange={(value) =>
          form.setValue(
            'assignee',
            value.map((item) => item.value),
          )
        }
      />
      <DateRangePicker
        classNames={{
          btn: 'rounded-md h-7 shadow-secondary! text-xs font-normal',
        }}
        onUpdate={(values) => {
          form.setValue('start_date', values.range.from.toISOString());
          form.setValue('due_date', values.range.to?.toISOString());
        }}
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
        onChange={(value) =>
          form.setValue(
            'priority',
            value.map((item) => item.value),
          )
        }
      />
      {/* <MultipleSelect
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
        onChange={(value) => form.setValue('reporter', value[0].value)}
      /> */}
    </div>
  );
};
export default TaskFilter;
