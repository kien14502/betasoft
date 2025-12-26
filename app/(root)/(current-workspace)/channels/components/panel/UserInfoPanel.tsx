import { useInfiniteGetRooms } from '@/services/conversation-service';
import PanelWrapper from './PanelWrapper';
import { Button } from '@/components/ui/button';
import { BellRing, Share2, X } from 'lucide-react';
import { ReactNode, useContext } from 'react';
import { PanelContext } from '../providers/PanelProvider';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import Image from 'next/image';
import { USER_AVATAR_URL } from '@/constants/common';
import { CalendarAdd, TaskSquare } from 'iconsax-reactjs';
import DeleteConversation from '../dialogs/DeleteConversation';

type Props = {
  id: string;
};

const UserInfoPanel = ({ id }: Props) => {
  const { user } = useAppSelector(getSelector('auth'));
  const { onClose } = useContext(PanelContext);
  const { data, isLoading } = useInfiniteGetRooms(id);

  const other = data?.room.members.find((m) => m.id !== user?.id);

  return (
    <div className="max-w-(--panel-chat-width) w-full flex flex-col gap-2">
      <PanelWrapper className="w-full">
        <div className="flex items-center justify-between px-6 py-4">
          <span className="font-semibold">Chat details</span>
          <Button variant={'ghost'} size={'icon-sm'} onClick={onClose}>
            <X className="text-gray-4" />
          </Button>
        </div>
        <div className="pb-6 px-7 w-full flex flex-col gap-3">
          {!isLoading && (
            <div className="flex flex-col items-center gap-2">
              <Image
                src={other?.profile_image || USER_AVATAR_URL}
                alt="Avatar"
                className="w-16 h-16 object-center rounded-full"
                width={64}
                height={64}
              />
              <div className="text-center">
                <h3 className="font-semibold text-sm">{other?.full_name}</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
          )}
          <div className="flex items-start justify-center gap-8">
            <ActionButton icon={<BellRing />} label="Mute notification" />
            <ActionButton
              icon={<Image width={16} height={16} src="/icons/pin.svg" alt="" />}
              label="Pin this chat"
            />
            <ActionButton icon={<TaskSquare />} label="Pin this chat" />
            <ActionButton icon={<CalendarAdd />} label="Create reminders" />
          </div>
        </div>
      </PanelWrapper>
      <PanelWrapper className="flex flex-col py-4 px-6">
        <Button className="justify-start text-xs font-medium" variant={'ghost'}>
          <Share2 size="24" />
          Share contact
        </Button>
        <DeleteConversation />
      </PanelWrapper>
    </div>
  );
};
export default UserInfoPanel;

const ActionButton = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <div className="flex flex-col items-center justify-center text-center gap-1">
    <Button
      className="rounded-full bg-blue-1 text-primary hover:bg-blue-2 hover:shadow"
      size={'icon-lg'}
      onClick={onClick}
    >
      {Icon}
    </Button>
    <span className="text-xs text-center font-medium">{label}</span>
  </div>
);
