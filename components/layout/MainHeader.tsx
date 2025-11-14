import Image from 'next/image';
import Subheader from './Subheader';
import WorkspaceSelector from './WorkspaceSelector';
import { InputWithPrefix } from '../common/InputPrefix';

const MainHeader = () => {
  return (
    <div className="flex justify-between">
      <Subheader />
      <div className="flex items-center gap-3 ml-auto">
        <button className="rounded-2xl shrink-0 bg-white p-2 shadow-secondary">
          <Image
            className="shrink-0 object-center"
            src={'/icons/bell.svg'}
            width={24}
            height={24}
            alt={''}
          />
        </button>
        <InputWithPrefix
          prefix={<Image width={24} height={24} src={'/icons/search.svg'} alt="" />}
          className="px-4 py-2 h-10 rounded-xl max-w-[180px] bg-white shadow-secondary!"
          placeholder="Search for ..."
        />
        <WorkspaceSelector />
      </div>
    </div>
  );
};
export default MainHeader;
