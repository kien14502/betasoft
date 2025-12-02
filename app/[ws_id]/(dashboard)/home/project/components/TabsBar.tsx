'use client';

import Tabs from '@/components/common/Tabs';
import { Tab } from '@/interface/common';
import { Calendar, ClipboardList, FileText, House, MessageCircleMore } from 'lucide-react';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const TabsBar = () => {
  const router = useRouter();
  const pathname = usePathname().split('/');
  const [activeTab, setActiveTab] = useState<string>(pathname[5]);

  const handleSelectTab = (value: string) => {
    setActiveTab(value);
    router.replace(value);
  };

  return <Tabs tabs={projectRoutes} activeTab={activeTab} setActiveTab={handleSelectTab} />;
};
export default TabsBar;

const projectRoutes: Tab[] = [
  {
    name: 'Summary',
    key: 'summary',
    icon: <House />,
  },
  {
    name: 'Sprint',
    key: 'sprint',
    icon: <ClipboardList />,
  },
  {
    name: 'Tasks',
    key: 'tasks',
    icon: <MessageCircleMore />,
  },
  {
    name: 'Documents',
    key: 'documents',
    icon: <FileText />,
  },
  {
    name: 'Calendar',
    key: 'calendar',
    icon: <Calendar />,
  },
];
