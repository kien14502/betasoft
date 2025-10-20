import Image from 'next/image';
import { ReactNode } from 'react';

type Props = {
  subHeader: ReactNode;
};

const MainHeader: React.FC<Props> = ({ subHeader }) => (
  <div className="flex justify-between !p-6 !pb-4">
    <div className="flex items-center gap-3 rounded-[64px] bg-white shadow-btn !py-3 !px-4">
      <Image className="object-cover" src={'/logo-company.svg'} width={32} height={32} alt={''} />
      <span>BETASOFT</span>
    </div>
    {subHeader}
    <div className="flex items-center gap-3">
      <div className="bg-white !py-3 !px-4 rounded-[64px] shadow-btn gap-2.5 flex items-center justify-center">
        <Image width={24} height={24} src={'/icons/search.svg'} alt={''} />
        <input className="outline-none" placeholder="Search for..." />
      </div>
      <button className="rounded-full bg-white !p-3 shadow-btn">
        <Image src={'/icons/bell.svg'} width={24} height={24} alt={''} />
      </button>
    </div>
  </div>
);
export default MainHeader;
