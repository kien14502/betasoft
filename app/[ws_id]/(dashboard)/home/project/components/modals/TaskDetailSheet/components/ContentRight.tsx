import { ResponseTaskResponse } from '@/app/api/generated.schemas';
import LabelView from './LabelView';
import { Calendar, ChevronsUp, CircleUser, FolderClosed, KeyRound } from 'lucide-react';
import Image from 'next/image';
import { USER_AVATAR_URL } from '@/constants/common';
import { useContext } from 'react';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import PriorityCell from '../../../cells/PriorityCell';

type Props = {
  task: ResponseTaskResponse;
};

const ContentRight = ({ task }: Props) => {
  const { project } = useContext(ProjectContext);
  return (
    <div className="col-span-2 pl-8 border-l border-gray-4 py-6 flex flex-col gap-6">
      <LabelView
        content={
          <div className="flex items-center gap-2 text-sm font-medium">
            <Image src={USER_AVATAR_URL} width={24} height={24} alt="" />
            {task.assignee?.full_name}
          </div>
        }
        icon={KeyRound}
      />
      <LabelView content={task.due_date} icon={Calendar} />
      <LabelView content={project?.project?.name} icon={FolderClosed} />
      <LabelView content={<PriorityCell variant="sm" task={task} />} icon={ChevronsUp} />
      <LabelView
        content={
          <div className="flex text-sm font-medium gap-2 items-center bg-gray-1 p-1 pr-3 rounded-3xl">
            <Image
              className="rounded-full"
              src={task.assignee?.profile_image || USER_AVATAR_URL}
              width={24}
              height={24}
              alt=""
            />
            {task.assignee?.full_name}
          </div>
        }
        icon={CircleUser}
      />
    </div>
  );
};
export default ContentRight;
