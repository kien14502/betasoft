import { FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@radix-ui/react-checkbox';
import { FormProps } from '@/interface/common';

const CheckboxForm = <T extends FieldValues>({ control, name, label, className }: FormProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-2 space-y-0', className)}>
          <FormControl>
            <div className="flex items-center gap-1">
              <Checkbox
                id={name.toString()}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor={name.toString()} className="cursor-pointer text-sm">
                {label}
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxForm;
