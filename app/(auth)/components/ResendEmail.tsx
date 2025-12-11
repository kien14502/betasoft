import useCountDown from '@/hooks/useCountDown';
import { useAuthRegister } from '@/services/auth-service';
import { fTimeCounter } from '@/utils/dayjs';
import { showToast } from '@/utils/toast';
import { Loader } from 'lucide-react';
import { memo } from 'react';

type Props = {
  email: string;
};

const Two_Minute = 120;

const ResendEmail = ({ email }: Props) => {
  const { counter, setCounter } = useCountDown(Two_Minute);
  const { mutate: register, isPending } = useAuthRegister();
  const onResendVerify = () => {
    register(
      { email: email, step: 1 },
      {
        onSuccess({ message }) {
          showToast(message, 'success');
          setCounter(Two_Minute);
        },
      },
    );
  };
  return (
    <div className="flex items-center gap-1 text-sm justify-center">
      You did not receive the code?
      {isPending ? (
        <>
          <Loader className="animate-spin" size={16} />
        </>
      ) : (
        <>
          {counter > 0 ? (
            <div>{fTimeCounter(counter)}</div>
          ) : (
            <button onClick={onResendVerify} className="text-blue-4 font-medium">
              Resend code
            </button>
          )}
        </>
      )}
    </div>
  );
};
export default memo(ResendEmail);
