import CreateWorkspaceForm from '../../../components/CreateWorkspaceForm';

const CreateWorkspace = () => (
  <div className="bg-white max-w-[784px] w-full flex flex-col gap-12 rounded-4xl p-16 pt-12 shadow-secondary">
    <div className="flex flex-col gap-1">
      <p className="text-[40px] font-medium">Create Your Workspace</p>
      <span className="text-xs text-gray-4">
        Your workspace contain your projects, teams and AI models.
      </span>
    </div>
    <CreateWorkspaceForm />
  </div>
);
export default CreateWorkspace;
