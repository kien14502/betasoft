import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import accessOptions, { AccessOptionType } from '@/constants/common';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Props = {
  value?: boolean;
  onChange: (value: boolean) => void;
};

const AccessSelect = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState<AccessOptionType | null>(
    accessOptions.find((option) => option.value === value) || null,
  );

  const handleSelect = (option: AccessOptionType) => {
    setSelectedAccess(option);
    onChange(option.value);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          'flex h-12 items-center justify-between rounded-none p-3 focus-visible:outline-none',
          open ? 'border-blue-3 border-2' : 'border-gray-4 border',
        )}
      >
        {selectedAccess ? (
          <div className="flex items-center">
            <selectedAccess.icon size={16} className="inline-block mr-2" />
            {selectedAccess.label}
          </div>
        ) : (
          'Select Access'
        )}
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 py-2 rounded-none shadow-popup min-w-(--radix-dropdown-menu-trigger-width)">
        {accessOptions.map((option) => (
          <DropdownMenuItem
            onClick={() => handleSelect(option)}
            className="relative group py-4 px-3 rounded-none"
            key={option.key}
          >
            <div className="flex items-center gap-4">
              <option.icon size={24} />
              <div className="flex flex-col gap-1">
                <p className="font-medium">{option.label}</p>
                <ul className="text-sm text-gray-8">
                  {option.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="hidden group-hover:block absolute w-0.5 h-full top-0 left-0 bg-blue-3" />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AccessSelect;
