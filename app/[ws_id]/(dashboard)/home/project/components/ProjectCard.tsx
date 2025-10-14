import { ResponseProjectsWithProjectMemberRole } from '@/app/api/generated.schemas';
import { timeAgo } from '@/utils/dayjs';
import TaskStatus from './TaskStatus';
import Image from 'next/image';
import { Button } from 'antd';
import MessageTag from './MessageTag';

type Props = {
  data: ResponseProjectsWithProjectMemberRole;
};

const ProjectCard: React.FC<Props> = ({ data }) => {
  const { project, statistic } = data;

  const activeTask = (statistic?.total_tasks || 0) - (statistic?.completed_tasks || 0);

  return (
    <div className="border relative rounded-3xl shadow-btn border-[#DDE1E6] bg-white !px-6 !py-4">
      <div className="text-[#787878] !mt-3 text-sm">{timeAgo(project?.created_at)}</div>
      <div className="flex items-center gap-2">
        <Image
          className="object-cover rounded-2xl"
          src={project?.avatar ?? ''}
          width={100}
          height={100}
          alt={''}
        />
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">{project?.name}</p>
          <span className="text-[#787878] text-sm line-clamp-3">{project?.description}</span>
          <div className="">members</div>
        </div>
      </div>
      <div className="flex items-center gap-2 !mt-6">
        <TaskStatus type={'active'} value={activeTask} />
        <TaskStatus type={'overdue'} value={statistic?.overdue_tasks ?? 0} />
      </div>
      <div className="w-full flex items-center !mt-6">
        <Button
          type="text"
          icon={<Image src={'/icons/plus.svg'} width={20} height={20} alt={''} />}
        />
        <Button
          type="text"
          icon={<Image src={'/icons/calendar.svg'} width={20} height={20} alt={''} />}
        />
        <Button
          className="!ml-auto"
          type="text"
          icon={<Image src={'/icons/dots.svg'} width={24} height={24} alt={''} />}
        />
      </div>
      <MessageTag />
    </div>
  );
};
export default ProjectCard;
