import { Button } from '@/components/ui/button';
import useCountDown from '@/hooks/useCountDown';
import { useForgotPassword } from '@/services/auth-service';
import { fTimeCounter } from '@/utils/dayjs';
import { showToast } from '@/utils/toast';

const Two_Minute = 120;

type Props = { email: string };

const ResendVerifyCode = ({ email }: Props) => {
  const { counter, setCounter } = useCountDown(Two_Minute);
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onResend = () => {
    forgotPassword(
      { step: 1, email },
      {
        onSuccess: ({ message }) => {
          showToast(message, 'success');
          setCounter(Two_Minute);
        },
      },
    );
  };

  return (
    <div className="flex items-center text-sm gap-1 justify-center">
      <span>You did not receive the code?</span>
      {counter > 0 ? (
        <div className="text-blue-4">Resend code({fTimeCounter(counter)})</div>
      ) : (
        <Button
          isLoading={isPending}
          size={'sm'}
          variant={'ghost'}
          className="text-blue-4 font-medium"
          onClick={onResend}
        >
          Resend code
        </Button>
      )}
    </div>
  );
};

export default ResendVerifyCode;
