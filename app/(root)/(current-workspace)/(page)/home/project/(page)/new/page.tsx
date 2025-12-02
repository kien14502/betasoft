'use client';

import { useRouter } from 'next/navigation';

import { usePostAuthProjects } from '@/app/api/project/project';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import WrapperContent from '../../components/WrapperContent';
import InformationForm from '../../components/InformationForm';
import AddMembers from '../../components/AddMembers';
import { useForm } from 'react-hook-form';
import { createProjectSchema, CreateProjectSchemaType } from '@/constants/schemas/workspace-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { DEFAULT_TASK_LIST } from '@/constants/common';
import { labels, sprints } from '@/utils/common';
import { RequestCreateProjectRequest } from '@/app/api/generated.schemas';
import { showToast } from '@/utils/toast';
import { useAppSelector, getSelector } from '@/hooks/useRedux';

const TrackWork = dynamic(() => import('../../components/TrackWork'));

const NewProjectPage = () => {
  const { info } = useAppSelector(getSelector('workspace'));
  const router = useRouter();
  const { mutate: createProject, isPending } = usePostAuthProjects();
  const [openTrackworkModal, setOpenTrackworkModal] = useState<boolean>(false);
  const { user: profile } = useAppSelector(getSelector('auth'));
  const form = useForm<CreateProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      task_list: DEFAULT_TASK_LIST,
      labels: labels,
      sprints: sprints,
      org_id: info?.id,
      is_team: false,
      settings: {
        allow_guests: true,
        enable_due_dates: true,
        enable_notifications: true,
        enable_time_tracking: true,
      },
      project_type: 'test',
      name: '',
      lead: profile?.id,
    },
  });

  const onFinish = () => {
    toggleModal();
  };

  useEffect(() => {
    form.setValue('org_id', info?.id || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  useEffect(() => {
    form.setValue('lead', profile?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleCreateProject = () => {
    createProject(
      { data: form.getValues() as RequestCreateProjectRequest },
      {
        onSuccess({ data, message }) {
          showToast(message || 'Create project successfully', 'success');
          setOpenTrackworkModal(false);
          router.push(`/home/project/${data?.id}`);
        },
      },
    );
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
              idWs={info?.id || ''}
              onChangeMemberSeleted={(members) =>
                form.setValue(
                  'members',
                  members.map((item) => item.id ?? ''),
                )
              }
              memberCount={info?.member_count || 0}
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
          isLoading={isPending}
        />
      </form>
    </Form>
  );
};

export default NewProjectPage;
