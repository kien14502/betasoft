import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import InputForm from '@/components/common/form/InputField';
import ColorPicker from '@/components/common/ColorPicker';

const CreateSection = () => {
  const form = useForm();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="shadow-secondary rounded-xl" variant={'secondary'} size={'icon-lg'}>
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-1 sm:max-w-[400px]">
        <Form {...form}>
          <form className="flex items-center gap-2">
            <ColorPicker onColorChange={(value) => form.setValue('color', value)} />
            <InputForm
              className="w-full"
              placeholder="New section"
              control={form.control}
              name="section"
            />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
export default CreateSection;
