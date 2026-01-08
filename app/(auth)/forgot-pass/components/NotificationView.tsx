import { Form } from '@/components/ui/form';
import {
  RequestForgotPasswordSchemaType,
  requestForgotPasswordSchema,
} from '@/constants/schemas/password-schema';
import { useForgotPassword } from '@/services/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const NotificationView = () => {
  const form = useForm<RequestForgotPasswordSchemaType>({
    resolver: zodResolver(requestForgotPasswordSchema),
    defaultValues: { verify_code: '' },
  });

  const { mutate: forgotPassword } = useForgotPassword();

  const onSubmit = (values: RequestForgotPasswordSchemaType) => {
    forgotPassword(values, {
      onSuccess: () => {
        console.log('nice');
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}></form>
    </Form>
  );
};

export default NotificationView;
