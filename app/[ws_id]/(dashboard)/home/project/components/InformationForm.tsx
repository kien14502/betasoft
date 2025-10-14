'use client';

import { RequestCreateProjectRequest } from '@/app/api/generated.schemas';
import UploadImage from '@/components/common/UploadImage';
import { Form, Input, Select, Space } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import accessOptions from './AccessOptions';
import DropdownItem from './DropdownItem';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  form: FormInstance<RequestCreateProjectRequest>;
};

const InformationForm: React.FC<Props> = ({ form }) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const handleSelect = (value: boolean) => {
    form.setFieldsValue({
      settings: {
        allow_guests: value,
      },
    });
    setOpenDropdown(false);
  };

  return (
    <>
      <Form.Item
        rules={[{ required: true, message: 'Upload avatar is required' }]}
        layout="vertical"
        className="[&_.ant-form-item-label>label]:font-bold"
        name={'avatar'}
        label={'Avatar'}
      >
        <UploadImage maxImageUpload={1} width={150} height={150} aspect={1} />
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        layout="vertical"
        className="[&_.ant-form-item-label>label]:font-bold"
        rules={[
          { required: true, message: 'Name is required' },
          { min: 3, message: 'Name must be at least 3 characters' },
        ]}
      >
        <Input
          variant="underlined"
          className="focus:!border-[2px] !border-[1px] !border-[#AEAEB2] shadow-btn focus:!border-[#0045AC] !h-12"
        />
      </Form.Item>
      <Form.Item
        layout="vertical"
        name="descriptions"
        label="Description"
        className="[&_.ant-form-item-label>label]:font-bold"
        rules={[
          { required: true, message: 'Description is required' },
          { min: 3, message: 'Description must be at least 3 characters' },
        ]}
      >
        <TextArea
          className="focus:!border-[2px] !border-[#AEAEB2] shadow-btn focus:!border-[#0045AC] !resize-none !rounded-none
            [&_.ant-input-focused]:!ring-0 !focus:shadow-btn 
            [&_.ant-input]:!ring-0
            focus:!ring-0"
          rows={4}
        />
      </Form.Item>

      <Form.Item
        layout="vertical"
        label="Access"
        name={['settings', 'allow_guests']}
        className="[&_.ant-form-item-label>label]:font-bold"
        rules={[{ required: true, message: 'Acess is required' }]}
      >
        <Select
          open={openDropdown}
          onOpenChange={setOpenDropdown}
          className="!h-12 flex items-center shadow-btn [&_.ant-select-selector]:!border-[1px] [&_.ant-select-selector]:!border-[#AEAEB2] [&_.ant-select-selector:focus]:!border-[2px] [&_.ant-select-focused]:!shadow-none [&_.ant-select-focused]:!ring-0 [&_.ant-select-selector:focus]:!border-[#0045AC]"
          placeholder="Select a access"
          popupRender={() => (
            <>
              {accessOptions.map((option) => (
                <DropdownItem
                  focus={form.getFieldValue(['settings', 'allow_guests'])}
                  key={option.key}
                  options={option}
                  onSelect={handleSelect}
                />
              ))}
            </>
          )}
          classNames={{ popup: { root: '!p-0 rounded-none' } }}
          options={accessOptions.map((opt) => ({
            value: opt.value,
            label: (
              <Space className="!h-12 items-center" size={8}>
                <Image
                  src={opt.value ? '/icons/unlock-fill.svg' : '/icons/lock-fill.svg'}
                  width={24}
                  height={24}
                  alt={'lock icon'}
                />
                {opt.label}
              </Space>
            ),
          }))}
        ></Select>
      </Form.Item>
    </>
  );
};
export default InformationForm;
