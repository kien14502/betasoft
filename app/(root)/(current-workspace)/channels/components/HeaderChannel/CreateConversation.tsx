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
import FindMember from './FindMember';
import { useCreateRoom } from '@/services/conversation-service';
import { CHAT_TYPE, ROOMS_TYPE } from '@/constants/common';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  key_chat: CHAT_TYPE;
};

const CreateConversation = ({ key_chat }: Props) => {
  const router = useRouter();
  const form = useForm<CreateConversationSchema>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(createConversationSchema),
  });
  const { mutate: createRoom, isPending } = useCreateRoom();

  useEffect(() => {
    form.setValue('type_of_room', ROOMS_TYPE[key_chat]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key_chat]);

  const onSubmit = (values: CreateConversationSchema) => {
    createRoom(values, {
      onSuccess({ data }) {
        const findType = Object.entries(ROOMS_TYPE).find(
          ([, value]) => value === data.type_of_room,
        );
        const fType = findType?.[0] ?? CHAT_TYPE.GLOBAL;
        router.push(`/channels/${fType}/${data.id}`);
      },
    });
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
      <DialogContent className="p-8 rounded-4xl sm:min-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a channel</DialogTitle>
          <DialogDescription>
            Channels are where conversations happen around a topic. Use a name that is easy to find
            and understand.
          </DialogDescription>
          <Form {...form}>
            <form className="w-full grid grid-cols-2 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <InputForm
                  control={form.control}
                  label="Name conversation"
                  name="name"
                  required={true}
                  placeholder="Enter name conversation"
                />
                <Button isLoading={isPending} variant={'active'} type="submit">
                  Create
                </Button>
              </div>
              <div>
                <FindMember onChange={(ids) => form.setValue('members', ids)} />
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateConversation;
