import { Icon } from '@/interface/common';
import { ReactNode } from 'react';

type Props = {
  icon: Icon;
  content: ReactNode;
};

const LabelView = ({ content, icon: Icon }: Props) => (
  <div className="flex items-center gap-5">
    <Icon size={20} className="text-gray-5" />
    {typeof content === 'string' ? <div className="text-sm font-medium">{content}</div> : content}
  </div>
);
export default LabelView;
