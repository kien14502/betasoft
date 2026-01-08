import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormProps } from '@/interface/common';
import { cn } from '@/lib/utils';
import { FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = FormProps<T> & {
  placeholder?: string;
  rows?: number;
  maxLength?: number;
} & React.ComponentProps<'textarea'>;

const TextareaForm = <T extends FieldValues>({
  name,
  label,
  className,
  control,
  placeholder,
  rows = 10,
  maxLength,
  ...props
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn('flex flex-col gap-2 space-y-0', className)}>
          {label && <FormLabel className="mb-2 text-sm font-semibold">{label}</FormLabel>}
          <FormControl>
            <Textarea
              maxLength={maxLength}
              rows={rows}
              placeholder={placeholder}
              className={cn(
                'text-sm h-[198px] outline-none resize-none rounded-none shadow-popup! border-gray-5',
                'focus-visible:ring-offset-0 focus-visible:ring-0',
                'focus-visible:border-2 focus-visible:border-blue-4 transition-all duration-100',
                fieldState.error && 'border-destructive',
              )}
              {...field}
              {...props}
            />
          </FormControl>
          {maxLength && (
            <span className="text-sm text-gray-7 text-end">
              {field.value ? field.value.length : 0}/{maxLength}
            </span>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default TextareaForm;
