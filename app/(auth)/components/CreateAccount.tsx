'use client';

import { usePostAuthRegister } from '@/app/api/auth/auth';
import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { createAccountSchema, CreateAccountSchema } from '@/constants/schemas/register-schem';
import { cn } from '@/lib/utils';
import { showToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

const CreateAccount = () => {
  const router = useRouter();
  const { mutate: register, isPending: isRegisterLoading } = usePostAuthRegister();
  const form = useForm<CreateAccountSchema>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = (values: CreateAccountSchema) => {
    register(
      {
        data: {
          email: values.email,
          step: 1,
        },
      },
      {
        onSuccess({ data, message }) {
          router.push(`/verify-email?email=${data?.email}`);
          showToast(message || 'Register', 'success');
        },
      },
    );
  };

  const isActive = !form.formState.isValid || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)}>
        <InputForm
          placeholder="Enter your email here"
          control={form.control}
          name="email"
          label="Email"
          required
          prefix={<Image width={24} height={24} src={'/icons/email.svg'} alt="" />}
        />
        <FormField
          control={form.control}
          name={'agreement'}
          render={({ field }) => {
            return (
              <FormItem className={cn('flex flex-col gap-2 space-y-0')}>
                <div className="flex gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={cn(
                        'w-5 h-5',
                        'data-[state=checked]:bg-linear-to-t data-[state=checked]:border-0 data-[state=checked]:from-[#ffd900] data-[state=checked]:to-[#ffae00]',
                      )}
                    />
                  </FormControl>
                  <p className="text-xs">
                    Agree to the{' '}
                    <Link className="text-blue-4!" href={'/term'}>
                      terms of use
                    </Link>{' '}
                    and our{' '}
                    <Link className="text-blue-4!" href={'/privacy'}>
                      privacy policy
                    </Link>
                    , which describes how we collect, use, store, and share your data.
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button
          disabled={isActive || isRegisterLoading}
          size={'xl'}
          variant={!isActive ? 'active' : 'default'}
        >
          {isRegisterLoading && <Loader className="animate-spin" size={20} />}
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
export default CreateAccount;
