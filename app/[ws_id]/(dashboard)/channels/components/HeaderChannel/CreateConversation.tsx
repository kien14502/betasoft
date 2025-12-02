import { usePostAuthRoom } from '@/app/api/rooms/rooms';
import InputForm from '@/components/common/form/InputField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
  createConversationSchema,
  CreateConversationSchema,
} from '@/constants/schemas/conversation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

const CreateConversation = () => {
  const form = useForm<CreateConversationSchema>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(createConversationSchema),
  });
  const { mutate: createRoom } = usePostAuthRoom();

  const onSubmit = () => {
    createRoom(
      {
        data: {
          members: ['6901db44b4bdd3e8afec6719', '691e84694c247704ded36a50'],
          name: 'tesst',
          organization_id: '6901de9fb4bdd3e8afec672b',
          type_of_room: 2,
        },
      },
      {
        onSuccess({ data }) {
          console.log('dataa', data);
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="rounded-xl shadow-secondary"
          size={'icon-lg'}
          variant={'active'}
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
          <Form {...form}>
            <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
              <InputForm control={form.control} label="Name conversation" name="name" />
              <Button variant={'active'} type="submit">
                Create
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateConversation;
