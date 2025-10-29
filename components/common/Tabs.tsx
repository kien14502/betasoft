import { Tab } from '@/interface/common';
import { cn } from '@/utils/common';
import { motion } from 'framer-motion';

type Props = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Tabs: React.FC<Props> = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex gap-8">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        onClick={() => setActiveTab(tab.key)}
        className="relative !pb-3 w-[113px] !pt-1 flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
      >
        <div
          className={cn(
            'flex items-center gap-2 text-sm',
            activeTab === tab.key ? 'font-semibold text-blue-4' : 'text-gray-7',
          )}
        >
          {tab.icon}
          {tab.name}
        </div>

        {activeTab === tab.key && (
          <motion.div
            layoutId="activeTab"
            className="absolute rounded-t-full bottom-1 left-0 right-0 h-0.5 bg-blue-4"
            initial={false}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
        )}
      </button>
    ))}
  </div>
);
export default Tabs;
