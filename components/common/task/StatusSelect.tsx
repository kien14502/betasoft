import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ButtonTooltip } from '../ButtonTooltip';
import { CircleDashed } from 'lucide-react';
import { TaskSection } from '@/interface/task';
import { useMemo } from 'react';

type Props = {
  sections: TaskSection[];
  onChange: (value: string) => void;
  value: string;
};

const StatusSelect = ({ onChange, sections, value }: Props) => {
  const currentSection = useMemo(() => {
    return sections.find((item) => item.id === value);
  }, [sections, value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonTooltip content="Status" variant={'ghost'} size={'icon-xs'}>
          <CircleDashed color={currentSection?.color} />
        </ButtonTooltip>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          {sections.map((section) => (
            <div
              style={{ backgroundColor: section.color }}
              className="w-fit text-sm cursor-pointer text-white px-1 rounded"
              key={section.id}
              onClick={() => onChange(section.id)}
            >
              {section.name}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default StatusSelect;
