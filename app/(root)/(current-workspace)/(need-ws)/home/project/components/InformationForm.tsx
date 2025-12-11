'use client';

import { UseFormReturn } from 'react-hook-form';
import { CreateProjectSchemaType } from '@/constants/schemas/workspace-schema';
import InputForm from '@/components/common/form/InputField';
import TextareaForm from '@/components/common/form/TextareaForm';
import UploadImage from '@/components/common/UploadImage';
import AccessSelect from './AccessSelect';

type Props = {
  form: UseFormReturn<CreateProjectSchemaType>;
};

const InformationForm: React.FC<Props> = ({ form }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Avatar</span>
        <UploadImage onChange={(value) => form.setValue('avatar', value)} />
      </div>
      <InputForm
        className="mt-6"
        placeholder="Enter your project name here"
        control={form.control}
        name={'name'}
        label="Name"
      />
      <TextareaForm
        placeholder="Input project description"
        control={form.control}
        name="description"
        maxLength={400}
        label="Description"
        className="mt-6"
      />
      <AccessSelect
        value={form.getValues('settings.allow_guests')}
        onChange={(value) => form.setValue('settings.allow_guests', value)}
      />
    </>
  );
};
export default InformationForm;
