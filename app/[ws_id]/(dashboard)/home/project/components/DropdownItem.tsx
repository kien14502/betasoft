import { cn } from '@/utils/common';
import Image from 'next/image';

interface AccessOption {
  key: string;
  value: boolean;
  label: string;
  description: React.ReactNode;
}

type Props = {
  options: AccessOption;
  onSelect: (value: boolean) => void;
  focus: boolean;
};

const DropdownItem: React.FC<Props> = ({ options, onSelect, focus }) => {
  const isFocus = options.value === focus;

  return (
    <div
      onClick={() => onSelect(options.value)}
      className={cn(
        'p-4 flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 first:border-b first:border-[#AEAEB2]',
        isFocus ? 'bg-[#E5F1FF] border-l-2 border-l-[#005AF4]' : '',
      )}
    >
      <Image
        src={options.value ? '/icons/unlock-fill.svg' : '/icons/lock-fill.svg'}
        width={24}
        height={24}
        alt={'lock icon'}
      />
      <div>
        <div>
          <strong className={isFocus ? 'text-[#002E73]' : ''}>{options.label}</strong>
        </div>
        <p className={isFocus ? 'text-[#0045AC]' : ''} style={{ fontSize: '12px' }}>
          {options.description}
        </p>
      </div>
    </div>
  );
};
export default DropdownItem;
