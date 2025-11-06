import TextareaForm from '@/components/common/form/TextareaForm';
import { Form } from '@/components/ui/form';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

const CreateSection = () => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [isAddTask, setIsAddTask] = useState<boolean>(false);
  const form = useForm();
  const toggle = () => setIsAddTask(!isAddTask);

  const onSubmit = () => {};

  return (
    <div className="w-[200px] shrink-0" ref={inputRef}>
      {isAddTask ? (
        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <TextareaForm
              className="bg-white shadow-popup h-[100px]"
              control={form.control}
              name={'title'}
              rows={4}
              placeholder="Enter task title..."
            />
          </form>
        </Form>
      ) : (
        <button
          onClick={toggle}
          className="p-2.5 shrink-0 rounded-xl bg-bg-secondary active:scale-95"
        >
          <Image src={'/icons/plus.svg'} width={20} height={20} alt={''} />
        </button>
      )}
    </div>
  );
};
export default CreateSection;
