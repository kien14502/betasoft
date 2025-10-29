import { FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { InputWithPrefix } from '../InputPrefix';
import { FormProps } from '@/interface/common';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { HTMLInputTypeAttribute } from 'react';

type Props<T extends FieldValues> = FormProps<T> & {
  prefix?: ReactNode;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};

const InputForm = <T extends FieldValues>({
  control,
  name,
  label,
  className,
  prefix,
  type,
  placeholder,
}: Props<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      return (
        <FormItem className={cn('flex flex-col gap-2 space-y-0', className)}>
          {label && <FormLabel className="text-sm font-semibold">{label}</FormLabel>}
          <FormControl>
            <InputWithPrefix
              placeholder={placeholder}
              prefix={prefix}
              className={cn(
                'h-11 text-sm outline-none rounded-none shadow-popup border-gray-5',
                'focus-visible:ring-offset-0 focus-visible:ring-0',
                'focus-visible:border-2 focus-visible:border-blue-4 transition-all duration-100',
                fieldState.error && 'border-destructive',
              )}
              {...field}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      );
    }}
  />
);

export default InputForm;
