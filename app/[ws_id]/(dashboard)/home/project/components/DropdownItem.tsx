import { cn } from '@/utils/common';
import { Space, Typography } from 'antd';
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
        'p-4 flex items-center gap-4 !px-4 !py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 first:border-b first:border-[#AEAEB2]',
        isFocus ? 'bg-[#E5F1FF] !border-l-[2px] !border-l-[#005AF4]' : '',
      )}
    >
      <Image
        src={options.value ? '/icons/unlock-fill.svg' : '/icons/lock-fill.svg'}
        width={24}
        height={24}
        alt={'lock icon'}
      />
      <Space direction="vertical" size={4}>
        <Space size={8}>
          <Typography.Text className={isFocus ? '!text-[#002E73]' : ''} strong>
            {options.label}
          </Typography.Text>
        </Space>
        <Typography.Text
          type="secondary"
          className={isFocus ? '!text-[#0045AC]' : ''}
          style={{ fontSize: '12px' }}
        >
          {options.description}
        </Typography.Text>
      </Space>
    </div>
  );
};
export default DropdownItem;
