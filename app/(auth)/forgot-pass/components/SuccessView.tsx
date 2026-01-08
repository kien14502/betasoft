import { CircleCheckBig } from 'lucide-react';

const SuccessView = () => {
  return (
    <div className="flex items-center flex-col justify-center gap-6 min-h-[450px]">
      <CircleCheckBig className="text-green-500" size={80} />
      Password changed successfully.
    </div>
  );
};
export default SuccessView;
