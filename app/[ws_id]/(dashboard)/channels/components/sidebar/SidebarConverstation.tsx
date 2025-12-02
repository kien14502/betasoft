'use client';

import { Button } from '@/components/ui/button';
import { channelRoutes } from '@/constants/routes';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ConversationList from './ConversationList';

const SidebarConverstation = () => {
  const [activeTab, setActiveTab] = useState('dms');

  return (
    <div className="border flex flex-col gap-4 bg-white shadow-secondary rounded-4xl py-4 px-2 max-w-(--header-channel-width) w-full">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-11 shadow-secondary-inset bg-gray-1 p-1 border rounded-2xl grid grid-cols-3">
          {channelRoutes.map((tab) => (
            <button
              key={tab.path}
              onClick={() => setActiveTab(tab.path)}
              className="relative text-sm flex items-center justify-center text-center font-medium transition-colors focus-visible:outline-none"
            >
              {activeTab === tab.path && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-foreground"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  activeTab === tab.path ? 'text-background font-semibold' : 'text-muted-foreground'
                }`}
              >
                {tab.name}
              </span>
            </button>
          ))}
        </div>
        <Link href={'global'}>
          <Button
            className="rounded-2xl backdrop-blur-[20px]"
            size={'icon-lg'}
            style={{ background: 'var(--color-channel-global)' }}
          >
            <Image src={'/icons/earth.svg'} width={20} height={20} alt="" />
          </Button>
        </Link>
      </div>
      <ConversationList mode={activeTab} />
    </div>
  );
};
export default SidebarConverstation;
