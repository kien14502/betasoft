import { CHAT_TYPE } from '@/constants/common';
import { redirect } from 'next/navigation';

const ChannelsPage = async () => {
  redirect(`/channels/${CHAT_TYPE.GLOBAL}`);
};

export default ChannelsPage;
