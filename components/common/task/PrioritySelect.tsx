import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ButtonTooltip } from '../ButtonTooltip';
import { EUrgency } from '@/constants';
import Image from 'next/image';
import { Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const PrioritySelect = ({ onChange, value }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonTooltip content="Priority" variant={'outline'} size={'icon-xs'}>
          {value ? <Image src={`/icons/${value}.svg`} width={16} height={16} alt={''} /> : <Flag />}
        </ButtonTooltip>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          {Object.values(EUrgency).map((item) => (
            <button
              onClick={() => onChange && onChange(item)}
              className={cn(
                'text-sm h-[33px] w-fit flex items-center gap-2 font-medium capitalize text-[#131315] !py-2 !pr-4 !pl-3 border-gray-4 rounded-3xl border',
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
      </PopoverContent>
    </Popover>
  );
};
export default PrioritySelect;
