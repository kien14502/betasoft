import { cn } from '@/lib/utils';

type Props = {
  name: string;
  color: string;
  className?: string;
};

const StatusBadge = ({ name, color, className }: Props) => (
  <div
    className={cn('text-white w-fit text-sm font-medium py-1 px-2 rounded-[6px]', className)}
    style={{
      background: color,
    }}
  >
    {name}
  </div>
);
export default StatusBadge;
