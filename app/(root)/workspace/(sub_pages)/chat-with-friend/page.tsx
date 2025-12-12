import Link from 'next/link';
import SearchUserForm from '../../components/SearchUserForm';

const Page = () => (
  <>
    <div className="max-w-[600px] flex flex-col gap-8 w-full max-h-[688px] h-full p-16 pt-12 rounded-4xl shadow-secondary bg-white">
      <div className="flex flex-col gap-2">
        <p className="text-[40px] font-medium">Chat With Friend</p>
        <span className="text-xs text-gray-4">
          Find and connect with friends and partners right away! <br /> Then, you can create your
          own workspace together to manage your work.
        </span>
      </div>
      <SearchUserForm />
    </div>
    <Link className="text-sm text-white! mt-4 font-semibold hover:underline text-center" href={''}>
      Skip <br /> Do not add friends
    </Link>
  </>
);
export default Page;
