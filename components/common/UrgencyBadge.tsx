import { EUrgency } from '@/constants';
import { cn } from '@/utils/common';
import Image from 'next/image';

type Props = {
  value: string;
};

const UrgencyBadge: React.FC<Props> = ({ value }) => {
  const map: Record<string, string> = {
    [EUrgency.HIGHEST]: '#FFE8E9',
    [EUrgency.HIGH]: '#FFE8E9',
    [EUrgency.MEDIUM]: '#FFEED4',
    [EUrgency.LOW]: '#E5F1FF',
    [EUrgency.LOWEST]: '#E5F1FF',
  };

  return (
    <div
      style={{ background: map[value] }}
      className={cn('!p-2 rounded-xl flex gap-2 items-center w-fit text-sm font-medium capitalize')}
    >
      <Image width={16} height={16} src={`/icons/${value}.svg`} alt={''} />
      {value}
    </div>
  );
};
export default UrgencyBadge;
