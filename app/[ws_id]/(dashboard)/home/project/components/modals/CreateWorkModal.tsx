import { Button } from '@/components/common/Button';
import { Modal } from 'antd';

type Props = {
  toggle: () => void;
  isOpen: boolean;
};

const CreateWorkModal: React.FC<Props> = ({ toggle, isOpen }) => {
  return (
    <Modal
      title={
        <div className="border-b border-[#C7C7CC] !py-6 !px-8">
          <p className="text-[#0045AC] text-2xl font-semibold">NEW TASK</p>
          <span className="text-[#787878] text-sm font-normal">
            Required fields are marked with an asterisk
            <span className="text-[#F20005]">*</span>
          </span>
        </div>
      }
      styles={{ content: { padding: '0px', borderRadius: '12px' } }}
      open={isOpen}
      onOk={toggle}
      onCancel={toggle}
      footer={false}
      width={876}
      centered
    >
      <div className="!py-5 !px-8">test</div>
      <div className="border-t border-[#C7C7CC] flex items-center justify-end gap-4 !py-6 !px-8">
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Create task</Button>
      </div>
    </Modal>
  );
};
export default CreateWorkModal;
