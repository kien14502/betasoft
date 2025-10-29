import { Button } from '@/components/ui/button';
import { ColorPicker } from '@/components/ui/color-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from '@/components/ui/dialog';
import { CreateProjectSchemaType } from '@/constants/schemas/workspace-schema';
import { Plus, Trash } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

type Props = {
  onFinish: () => void;
  form: UseFormReturn<CreateProjectSchemaType>;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const TrackWork: React.FC<Props> = ({ onFinish, open, setOpen, form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'task_list',
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false} className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-blue-4 text-center">
            HOW DO YOU TRACK WORK?
          </DialogTitle>
          <DialogDescription className="text-gray-7 text-sm text-center">
            Once work is submitted, it advances through these defined statuses.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <input
                type="text"
                className="shadow-popup h-12 p-2 border outline-none text-sm border-gray-5 focus-visible:ring-offset-0"
                {...form.register(`task_list.${index}.name`)}
                placeholder="name"
              />
              <input
                type="text"
                className="shadow-popup h-12 p-2 border outline-none text-sm flex-1 border-gray-5 focus-visible:ring-offset-0"
                {...form.register(`task_list.${index}.description`)}
                placeholder="description"
              />
              <ColorPicker
                value={field.color}
                onChange={(color) => form.setValue(`task_list.${index}.color`, color)}
              />
              <Button variant={'ghost'} onClick={() => remove(index)} size={'icon'}>
                <Trash className="text-red-500" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          onClick={() =>
            append({
              name: '',
              description: '',
            })
          }
          type="button"
          variant={'outline'}
          className=""
        >
          <Plus />
          Add task
        </Button>
        <span className="text-gray-7 text-sm text-center">
          Don’t worry, you can change the status then.
        </span>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setOpen(false)}
            className="border-blue-3 rounded-xl"
            type="button"
            variant={'outline'}
          >
            Cancel
          </Button>
          <Button onClick={onFinish} type="button" variant={'ghost'} className="flex-1">
            Finish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default TrackWork;
