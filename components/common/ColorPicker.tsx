import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { Pipette } from 'lucide-react';
import { COLORS } from '@/utils/common';

type Props = {
  currentColor?: string;
  onColorChange?: (color: string) => void;
};

const ColorPicker = ({ currentColor, onColorChange }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>(currentColor ?? COLORS[0]);
  const setColor = (color: string) => {
    setSelectedColor(color);
    if (onColorChange) {
      onColorChange(color);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={'icon-sm'} variant="ghost">
          <div className="w-5 h-5 rounded-md shrink-0" style={{ background: selectedColor }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-1 sm:w-fit">
        <div className="grid grid-cols-5 gap-0.5 max-w-[200px]">
          {COLORS.map((color) => (
            <Button
              style={{ borderColor: selectedColor === color ? color : 'transparent' }}
              className="p-0.5 border-2 hover:border-gray-4! content rounded"
              key={color}
              size={'icon-sm'}
              variant={'ghost'}
              onClick={() => setColor(color)}
            >
              <div className="w-full h-full rounded" style={{ background: color }} />
            </Button>
          ))}
          <Button
            size={'icon-sm'}
            variant={'secondary'}
            className="p-0.5 border-2 hover:border-gray-4! content rounded"
          >
            <Pipette size={14} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default ColorPicker;
