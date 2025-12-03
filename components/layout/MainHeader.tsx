import Image from 'next/image';
import WorkspaceSelector from './WorkspaceSelector';
import { InputWithPrefix } from '../common/InputPrefix';

const MainHeader = () => (
  <div className="flex h-(--header-height) pt-4 px-4 pb-4 items-center justify-end">
    <div className="flex items-center gap-3 w-full justify-end">
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
        className="px-4 py-2 h-10 rounded-xl w-full bg-white shadow-secondary! min-w-[180px] shrink-0 flex-1"
        placeholder="Search for ..."
      />
      <WorkspaceSelector />
    </div>
  </div>
);
export default MainHeader;
