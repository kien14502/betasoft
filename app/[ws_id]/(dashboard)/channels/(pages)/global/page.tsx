import MessageConverstation from '../../components/converstation/MessageConverstation';
import MessageSidebar from '../../components/sidebar/MessageSidebar';

const GlobalConverstation = () => {
  return (
    <div className="flex w-full">
      <MessageSidebar />
      <MessageConverstation />
    </div>
  );
};

export default GlobalConverstation;
