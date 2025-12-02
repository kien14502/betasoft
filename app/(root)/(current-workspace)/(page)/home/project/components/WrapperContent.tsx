import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
  subTitle: string;
  className?: string;
};

const WrapperContent: React.FC<Props> = ({ children, title, subTitle, className }) => {
  return (
    <div className="col-span-1 flex flex-col shadow-btn rounded-xl bg-white py-12 px-16">
      <p className="text-[#0045AC] font-semibold">{title}</p>
      <div
        style={{
          marginBottom: '24px',
          marginTop: '4px',
        }}
        className={cn('text-[#787878] text-sm', className)}
      >
        {subTitle}
      </div>
      {children}
    </div>
  );
};
export default WrapperContent;
