'use client';

import { channelRoutes } from '@/constants/routes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ConversationList from './ConversationList';
import { CHAT_TYPE } from '@/constants/common';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import EmptyWsLaunched from '../EmptyWsLaunched';

type Props = {
  type: CHAT_TYPE;
};

const SidebarConversation = ({ type }: Props) => {
  const [activeTab, setActiveTab] = useState<CHAT_TYPE>(type);
  const { user } = useAppSelector(getSelector('auth'));
  const wsLaunched = user?.meta_data.organization;

  useEffect(() => {
    setActiveTab(type);
  }, [type]);

  const isWsExisted = !wsLaunched && type !== CHAT_TYPE.GLOBAL;

  return (
    <div className="border flex flex-col gap-4 bg-white shadow-secondary rounded-4xl py-4 px-2 max-w-(--header-channel-width) w-full">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-11 shadow-secondary-inset bg-gray-1 p-1 border rounded-5xl grid grid-cols-4">
          {channelRoutes.map((tab, i) => {
            return (
              <Link
                href={`/channels/${tab.path}`}
                key={tab.path}
                className="relative text-primary text-sm flex items-center justify-center text-center font-medium transition-colors focus-visible:outline-none"
              >
                {activeTab === tab.path && (
                  <motion.div
                    layoutId="activeTab"
                    className={cn(
                      'absolute inset-0 rounded-5xl',
                      i === channelRoutes.length - 1
                        ? 'bg-[linear-gradient(263.4deg,#FF9100_2.15%,#FF0055_34.93%,#E300E7_62.04%,#5900FF_95.72%)]'
                        : 'bg-foreground',
                    )}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeTab === tab.path
                      ? 'text-background font-semibold'
                      : 'text-muted-foreground font-medium'
                  }`}
                >
                  {tab.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      {isWsExisted ? <EmptyWsLaunched /> : <ConversationList type={type} />}
    </div>
  );
};
export default SidebarConversation;
