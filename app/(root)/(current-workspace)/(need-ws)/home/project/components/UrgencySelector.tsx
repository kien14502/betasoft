import { RequestCreateTaskRequestPriority } from '@/app/api/generated.schemas';
import { EUrgency } from '@/constants';
import { cn } from '@/utils/common';
import Image from 'next/image';

type Props = {
  onChange?: (value: RequestCreateTaskRequestPriority) => void;
  value?: string;
};

const UrgencySelector: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex items-center gap-4">
    {Object.values(EUrgency).map((item) => (
      <button
        onClick={() => onChange && onChange(item)}
        className={cn(
          'text-sm h-[33px] flex items-center gap-2 font-medium capitalize text-[#131315] !py-2 !pr-4 !pl-3 border-gray-4 rounded-3xl border',
          value === item && 'border-blue-3',
        )}
        type="button"
        key={item}
      >
        <Image src={`/icons/${item}.svg`} width={16} height={16} alt={''} />
        {item}
      </button>
    ))}
  </div>
);
export default UrgencySelector;
