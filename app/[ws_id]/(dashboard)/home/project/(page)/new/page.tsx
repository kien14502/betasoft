'use client';

import { useRouter } from 'next/navigation';
import {
  RequestCreateLabelDataToCreate,
  RequestCreateProjectRequest,
  RequestCreateSprintRequest,
  RequestTaskListDataToCreate,
  ResponseOrgMember,
} from '@/app/api/generated.schemas';
import { usePostAuthProjects } from '@/app/api/project/project';
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import useGetIdWorkspace from '@/hooks/useGetIdWorkspace';
import { AuthContext } from '@/components/providers/AuthProvider';
import WrapperContent from '../../components/WrapperContent';
import InformationForm from '../../components/InformationForm';
import AddMembers from '../../components/AddMembers';
import { useForm } from 'react-hook-form';
import { createProjectSchema, CreateProjectSchemaType } from '@/constants/schemas/workspace-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { DEFAULT_TASK_LIST } from '@/constants/common';
import { labels, sprints } from '@/utils/common';
const TrackWork = dynamic(() => import('../../components/TrackWork'));

const NewProjectPage = () => {
  const { idWs } = useGetIdWorkspace();
  const router = useRouter();
  const { mutate: createProject } = usePostAuthProjects();
  const [openTrackworkModal, setOpenTrackworkModal] = useState<boolean>(false);
  const { profile } = useContext(AuthContext);
  const form = useForm<CreateProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      task_list: DEFAULT_TASK_LIST,
      labels: labels,
      sprints: sprints,
      org_id: idWs,
      lead: profile?.user_id,
      settings: {
        allow_guests: true,
      },
    },
  });

  const onFinish = () => {
    toggleModal();
  };

  const handleCreateProject = () => {
    console.log('form', form.getValues());
  };

  const onCancel = () => router.back();

  const toggleModal = () => setOpenTrackworkModal(!openTrackworkModal);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFinish)} className="flex flex-col gap-4 flex-1">
        <div>
          <p className="text-[#002E73] text-[24px] font-semibold">Create Project</p>
          <span className="text-[#404040] text-sm">
            Add details about your project then edit project details at any time in project settings
          </span>
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <WrapperContent
            title={'INFORMATION'}
            subTitle={'Required fields are marked with an asterisk'}
          >
            <InformationForm form={form} />
          </WrapperContent>
          <WrapperContent
            title={'MEMBERS'}
            subTitle={'You can add members after creating the project in Project Settings.'}
          >
            <AddMembers
              onChangeMemberSeleted={(members) =>
                form.setValue(
                  'members',
                  members.map((item) => item.id ?? ''),
                )
              }
            />
          </WrapperContent>
        </div>
        <div className="flex items-center justify-end w-full gap-4">
          <button
            type="button"
            className="border-[#005AF4] border bg-white h-[52px] font-medium py-4 rounded-[14px] px-6"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#005AF4] h-[52px] text-white py-4 font-medium rounded-[14px] px-6"
          >
            Continue
          </button>
        </div>
        <TrackWork
          onFinish={handleCreateProject}
          open={openTrackworkModal}
          setOpen={setOpenTrackworkModal}
          form={form}
        />
      </form>
    </Form>
  );
};

export default NewProjectPage;
