import { FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { FormProps } from '@/interface/common';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Props<T extends FieldValues> = FormProps<T> & {
  options: { label: string; value: string }[];
  defaultValue?: string;
};

const RadioGroupForm = <T extends FieldValues>({
  control,
  name,
  options,
  label,
  defaultValue,
  className,
}: Props<T>) => {
  console.log('options', options);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-2 space-y-0', className)}>
          {label && <FormLabel className="mb-2">{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              defaultValue={defaultValue ?? field.value}
              onValueChange={field.onChange}
              value={field.value}
            >
              {options.map((option) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioGroupForm;
