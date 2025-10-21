import ProjectIdView from '../views/ProjectIdView';

type Props = {
  params: Promise<{ id: string }>;
};

const ProjectId = async ({ params }: Props) => {
  const { id } = await params;
  return <ProjectIdView id={id} />;
};
export default ProjectId;
