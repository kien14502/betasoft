import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';
import { Control, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
  control: Control<T>;
  maxLength?: number;
  name: Path<T>;
};

const OtpInputForm = <T extends FieldValues>({ control, maxLength = 6, name }: Props<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <InputOTP
            {...field}
            maxLength={maxLength}
            className="flex items-center w-full justify-center"
          >
            <InputOTPGroup className="gap-3 *:data-[slot=input-otp-slot]:rounded-[11px] *:data-[slot=input-otp-slot]:border-2">
              {Array.from({ length: maxLength }).map((_, i) => (
                <InputOTPSlot
                  key={i}
                  className={cn(
                    'w-14 text-[32px] font-medium h-16',
                    'data-[active=true]:border-blue-4 data-[active=true]:ring-0',
                  )}
                  index={i}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
export default OtpInputForm;
