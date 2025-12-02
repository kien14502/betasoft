import { Checkbox } from '@/components/ui/checkbox';

const RememberAccount = () => {
  return (
    <div className="flex items-center gap-1">
      <Checkbox className="h-5 w-5" />
      <label className="text-sm">Remember account</label>
    </div>
  );
};
export default RememberAccount;
