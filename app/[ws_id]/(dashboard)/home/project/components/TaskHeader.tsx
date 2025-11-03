import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import TaskFilter from './filter/TaskFilter';

type Props = {
  viewMode: 'kanban' | 'list';
  setViewMode: (value: 'kanban' | 'list') => void;
};

const TaskHeader: React.FC<Props> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6 flex-1">
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => setViewMode('list')}
          className={viewMode === 'list' ? 'bg-blue-1' : ''}
        >
          <Image src={'/icons/check-list.svg'} width={20} height={20} alt={''} />
        </Button>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => setViewMode('kanban')}
          className={viewMode === 'kanban' ? 'bg-blue-1' : ''}
        >
          <Image src={'/icons/chart-bar.svg'} width={20} height={20} alt={''} />
        </Button>
        <Input
          placeholder="Search work"
          className="max-w-[200px] h-10 rounded-none shadow-main"
          // prefix={<Image width={16} height={16} src={'/icons/search.svg'} alt={''} />}
        />
      </div>
      <TaskFilter />
    </div>
  );
};
export default TaskHeader;
