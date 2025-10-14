import { cn } from '@/utils/common';

type Props = {
  type: 'active' | 'overdue';
  value: number;
};

const TaskStatus: React.FC<Props> = ({ type, value }) => {
  return (
    <div className="border border-[#C7C7CC] rounded-3xl !py-2 !px-6 w-fit">
      <span
        className={cn(
          'text-sm font-semibold',
          type === 'active' ? 'text-[#00D536]' : 'text-[#F20005]',
        )}
      >
        {value}
      </span>
      <span className="text-xs text-[#131315] !ml-2">
        {type === 'active' && 'Active Task'}
        {type === 'overdue' && 'Overdue Task'}
      </span>
    </div>
  );
};
export default TaskStatus;
