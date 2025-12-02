import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormProps } from '@/interface/common';
import { cn } from '@/lib/utils';
import { FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = FormProps<T> & {
  options: { label: string; value: string }[];
  defaultValue?: string;
  placeholder?: string;
};

const SelectForm = <T extends FieldValues>({
  control,
  name,
  options,
  label,
  className,
  placeholder = 'Select an option',
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-2 space-y-0', className)}>
          {label && <Label className="mb-2">{label}</Label>}
          <FormControl>
            <Select {...field}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectForm;
