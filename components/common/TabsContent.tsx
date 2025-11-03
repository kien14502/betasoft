import { Tabs, TabsContent as TabBody, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, ReactNode, RefAttributes, useState } from 'react';

type Tab = {
  value: string;
  label: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
};

type Content = {
  body: ReactNode;
  value: string;
};

type Props = {
  tabs: Tab[];
  contents: Content[];
  defaultValue: string;
  clasName?: string;
};

const TabsContent = ({ contents, tabs, defaultValue, clasName }: Props) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className={cn(clasName)}>
      <TabsList className="bg-inherit p-0 gap-6">
        {tabs.map((tab) => (
          <TabsTrigger
            className={cn(
              'data-[state=active]:shadow-none relative',
              'pt-1 py-1.5 pb-3',
              activeTab === tab.value ? 'text-blue-4' : 'font-normal text-gray-7',
            )}
            key={tab.value}
            value={tab.value}
          >
            {tab.icon && <tab.icon />} {tab.label}
            {activeTab === tab.value && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-1 left-0 right-0 h-0.5 bg-blue-4"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {contents.map((content) => (
        <TabBody key={content.value} value={content.value}>
          {content.body}
        </TabBody>
      ))}
    </Tabs>
  );
};
export default TabsContent;
