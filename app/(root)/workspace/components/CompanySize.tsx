import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { FormProps } from '@/interface/common';
import { cn } from '@/lib/utils';
import { FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = FormProps<T> & {
  options: { label: string; value: number }[];
  defaultValue?: string;
};
const CompanySize = <T extends FieldValues>({
  control,
  name,
  options,
  label,
  className,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          {label && <FormLabel className="text-sm font-semibold">{label}</FormLabel>}
          <FormControl>
            <div className="flex items-center gap-4">
              {options.map((option) => {
                const isSelected = field.value == option.value;
                return (
                  <Button
                    className={cn('rounded-full text-sm', isSelected && 'border-blue-4 bg-blue-2')}
                    size={'sm'}
                    variant={'outline'}
                    key={option.value}
                    type="button"
                    onClick={() => field.onChange(option.value)}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default CompanySize;
