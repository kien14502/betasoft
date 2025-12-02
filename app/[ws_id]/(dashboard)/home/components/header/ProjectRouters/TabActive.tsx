import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {
  name: string;
  icon: string;
};

const TabActive = ({ name, icon }: Props) => {
  return (
    <motion.div
      layoutId="active-tab"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
      }}
      style={{
        backgroundImage: 'url("/images/tab.png")',
        width: '174px',
      }}
      className={cn(
        'h-10 absolute flex items-center justify-center gap-2 font-semibold text-blue-5!',
        'bottom-0 left-1/2  translate-x-[-50%]',
      )}
    >
      <Image width={20} height={20} src={icon} alt={''} />
      {name}
    </motion.div>
  );
};
export default TabActive;
