import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { createPasswordSchema, CreatePasswordSchema } from '@/constants/schemas/register-schem';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import PasswordRules from './PasswordRules';
import { showToast } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { setClientCookie } from '@/utils/cookie.client';
import { EToken } from '@/constants';
import { setAuth } from '@/lib/features/auth/authSlice';
import { saveAuthStorage } from '@/utils/authStorage';
import { useAppDispatch } from '@/hooks/useRedux';
import { useAuthRegister } from '@/services/auth-service';
import Image from 'next/image';

type Props = {
  email: string;
  code: string;
};

const CreatePassword = ({ email, code }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mutate: register, isPending: isRegisterLoading } = useAuthRegister();
  const form = useForm<CreatePasswordSchema>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      confirmPassword: '',
      fullname: '',
      password: '',
      step: 3,
    },
  });

  const onSubmit = (values: CreatePasswordSchema) => {
    register(
      {
        step: values.step,
        password: values.password,
        full_name: values.fullname,
        email: email,
        verify_code: code,
      },
      {
        onSuccess: ({ message, data }) => {
          const token = data?.token || '';
          setClientCookie(EToken.ACCESS_TOKEN, token);
          dispatch(setAuth(data.user));
          saveAuthStorage('ACCESS_TOKEN', token);
          router.replace('/');
          showToast(message || 'Register account successfully', 'success');
        },
      },
    );
  };

  const isActive = !form.formState.isValid || form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-11">
      <p className="text-[40px] font-medium">Create Password</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-11">
          <InputForm
            prefix={<Image width={24} height={24} src={'/icons/user-round.svg'} alt="" />}
            label="Fullname"
            control={form.control}
            name="fullname"
            required={true}
          />
          <InputForm
            prefix={<Image width={24} height={24} src={'/icons/lock.svg'} alt="" />}
            type="password"
            label="Password"
            control={form.control}
            name="password"
            required={true}
          />
          <PasswordRules password={form.watch('password')} />
          <InputForm
            prefix={<Image width={24} height={24} src={'/icons/lock.svg'} alt="" />}
            type="password"
            label="Confirm Password"
            control={form.control}
            name="confirmPassword"
            required={true}
          />
          <Button
            disabled={isActive || isRegisterLoading}
            size={'xl'}
            variant={!isActive ? 'active' : 'default'}
          >
            {isRegisterLoading && <Loader className="animate-spin" size={20} />}
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default CreatePassword;
