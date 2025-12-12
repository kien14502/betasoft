import taskColumn from './columns/taskColumn';
import { TaskTable } from './tables/TaskTable';
import TaskDetailSheet from './modals/TaskDetailSheet';
import EmptyWork from './EmptyWork';
import { ModalTaskTableContext } from '../providers/ModalTaskTableProvider';
import { useCallback, useContext } from 'react';
import { Task } from '@/interface/task';

type Props = { tasks: Task[] };

const ListTask = ({ tasks }: Props) => {
  const {
    isShowModal,
    setShowModal,
    content: task,
    setContent,
  } = useContext(ModalTaskTableContext);
  const toggle = useCallback(() => {
    setShowModal(!isShowModal);
    setContent(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowModal]);

  if (tasks?.length === 0) return <EmptyWork />;

  return (
    <div className="w-full h-full min-h-0 flex-1 mt-2 overflow-x-hidden">
      <TaskTable columns={taskColumn()} data={tasks || []} />
      <TaskDetailSheet isShowModal={isShowModal} toggle={toggle} task={task} />
    </div>
  );
};
export default ListTask;
