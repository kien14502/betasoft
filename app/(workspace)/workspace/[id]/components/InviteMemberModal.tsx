import { RequestInviteMemberRequest } from '@/app/api/generated.schemas';
import { usePostAuthOrganizationsInvite } from '@/app/api/organizations/organizations';
import { showToast } from '@/utils/toast';
import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

interface IInviteMemberProps {
  id: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

const InviteMember = ({ id, isModalOpen, setIsModalOpen }: IInviteMemberProps) => {
  const { mutate, isPending } = usePostAuthOrganizationsInvite();

  const onFinish = (values: RequestInviteMemberRequest) => {
    mutate(
      { data: { org_id: id, email: values.email } },
      {
        onSuccess({ message }) {
          showToast(message ?? 'Invite member successfully', 'success');
          setIsModalOpen(false);
        },
      },
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="Invite member"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form initialValues={{ role: 'member' }} onFinish={onFinish}>
        <Form.Item
          label={'Email'}
          name={'email'}
          rules={[{ required: true, message: 'Email is require!' }]}
        >
          <Input />
        </Form.Item>
        <Button loading={isPending} htmlType="submit">
          Invite
        </Button>
      </Form>
    </Modal>
  );
};

export default InviteMember;
