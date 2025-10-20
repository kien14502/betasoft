'use client';

import { Form, Modal, UploadFile } from 'antd';
import InformationForm from '../components/InformationForm';
import WrapperContent from '../components/WrapperContent';
import { useRouter } from 'next/navigation';
import {
  RequestCreateLabelDataToCreate,
  RequestCreateProjectRequest,
  RequestTaskListDataToCreate,
  ResponseOrgMember,
} from '@/app/api/generated.schemas';
import { usePostAuthProjects } from '@/app/api/project/project';
import { useForm } from 'antd/es/form/Form';
import AddMembers from '../components/AddMembers';
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import useGetIdWorkspace from '@/hooks/useGetIdWorkspace';
import { AuthContext } from '@/components/providers/AuthProvider';
const TrackWork = dynamic(() => import('../components/TrackWork'));

type Payload = Omit<RequestCreateProjectRequest, 'avatar'> & { avatar: UploadFile[] };

const NewProjectPage = () => {
  const { idWs } = useGetIdWorkspace();
  const router = useRouter();
  const [form] = useForm();
  const { mutate: createProject } = usePostAuthProjects();
  const [memberSelected, setMemberSelected] = useState<string[]>([]);
  const [openTrackworkModal, setOpenTrackworkModal] = useState<boolean>(false);
  const { profile } = useContext(AuthContext);

  const onFinish = () => {
    // e.preventDefault();
    setOpenTrackworkModal(true);
  };

  const handleCreateProject = (tasks_list: RequestTaskListDataToCreate[]) => {
    const refactorTaskList = tasks_list.map((item, i) => ({ ...item, position: i + 1 }));
    const values: Payload = form.getFieldsValue();
    const labels: RequestCreateLabelDataToCreate[] = [
      {
        name: 'Bug',
        description: 'Issues that need to be fixed',
        color: '#D73A49',
        project_id: '',
      },
    ];
    const payload = {
      ...values,
      avatar: values.avatar[0].response,
      tasks_list: refactorTaskList,
      org_id: idWs,
      labels: labels,
      lead: profile?.id,
      members: memberSelected,
    };

    createProject({ data: payload });
  };

  const onCancel = () => router.back();

  const onChangeMemberSeleted = (members: ResponseOrgMember[]) => {
    const memberIds = members
      .map((item) => item.id)
      .filter((id): id is string => id !== undefined && id !== null);

    setMemberSelected(memberIds);
  };

  const toggleModal = () => setOpenTrackworkModal(!openTrackworkModal);

  return (
    <Form className="flex flex-col gap-4 flex-1" form={form} onFinish={onFinish}>
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
          <AddMembers onChangeMemberSeleted={onChangeMemberSeleted} />
        </WrapperContent>
      </div>
      <div className="flex items-center justify-end w-full gap-4">
        <button
          type="button"
          className="border-[#005AF4] border bg-white h-[52px] font-medium !py-4 rounded-[14px] !px-6"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-[#005AF4] h-[52px] text-white !py-4 font-medium rounded-[14px] !px-6"
          type="submit"
        >
          {!form.isFieldsTouched() ? 'Create Project' : 'Continue'}
        </button>
      </div>
      <Modal
        wrapClassName="rounded-xl"
        open={openTrackworkModal}
        onOk={toggleModal}
        onCancel={toggleModal}
        width={600}
        footer={false}
      >
        <TrackWork onFinish={handleCreateProject} />
      </Modal>
    </Form>
  );
};

export default NewProjectPage;
