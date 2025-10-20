import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
  subTitle: string;
};

const WrapperContent: React.FC<Props> = ({ children, title, subTitle }) => {
  return (
    <div className="col-span-1 flex flex-col shadow-btn rounded-xl bg-white !py-12 !px-16">
      <p className="text-[#0045AC] font-semibold">{title}</p>
      <div
        style={{
          marginBottom: '24px',
          marginTop: '4px',
        }}
        className="text-[#787878] text-sm"
      >
        {subTitle}
      </div>
      {children}
    </div>
  );
};
export default WrapperContent;
