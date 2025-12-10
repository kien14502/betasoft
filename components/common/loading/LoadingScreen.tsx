import { Loader } from 'lucide-react';

const LoadingScreen = () => (
  <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
    <Loader size={50} className="animate-spin" />
    Init application
  </div>
);
export default LoadingScreen;
