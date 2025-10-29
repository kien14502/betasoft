// 'use client';

// import { useGetAuthProjectsProjectId } from '@/app/api/project/project';
// import { Skeleton, Tabs, TabsProps } from 'antd';
// import {
//   CalendarOutlined,
//   FolderOpenOutlined,
//   PieChartOutlined,
//   ProfileOutlined,
// } from '@ant-design/icons';
// import dynamic from 'next/dynamic';

// type Props = {
//   id: string;
// };

// const ProjectIdView: React.FC<Props> = ({ id }) => {
//   const { data: projectData, isPending } = useGetAuthProjectsProjectId(id);
//   const project = projectData?.data;
//   const projectsRoutes: TabsProps['items'] = [
//     {
//       key: '1',
//       label: (
//         <div className="flex items-center gap-2">
//           <PieChartOutlined className="text-xl !mr-0" />
//           <span className="text-sm">Sumary</span>
//         </div>
//       ),
//       children: <SummaryView />,
//     },
//     {
//       key: '2',
//       label: (
//         <div className="flex items-center gap-2">
//           <ProfileOutlined className="text-xl !mr-0" />
//           <span className="text-sm">Tasks</span>
//         </div>
//       ),
//       children: <TasksView id={id} />,
//     },
//     {
//       key: '3',
//       label: (
//         <div className="flex items-center gap-2">
//           <FolderOpenOutlined className="text-xl !mr-0" />
//           <span className="text-sm">Documents</span>
//         </div>
//       ),
//       children: <DocumentsView />,
//     },
//     {
//       key: '4',
//       label: (
//         <div className="flex items-center gap-2">
//           <CalendarOutlined className="text-xl !mr-0" />
//           <span className="text-sm">Calendar</span>
//         </div>
//       ),
//       children: <CalendarView />,
//     },
//   ];
//   return (
//     <div className="w-full flex flex-col gap-4">
//       <div className="flex items-center gap-1">
//         <span className="text-[#787878]">PROJECTS </span>
//         {isPending ? (
//           <>
//             <Skeleton.Node style={{ height: '16px' }} active />
//           </>
//         ) : (
//           <span className="font-semibold uppercase"> / {project?.name}</span>
//         )}
//       </div>
//       <div className="!py-4 !px-6 bg-white flex-1 rounded-2xl shadow-btn flex flex-col">
//         {isPending ? (
//           <>
//             <Skeleton.Node style={{ height: '16px' }} active />
//             <Skeleton.Node style={{ height: '14px', width: '100%' }} active />
//           </>
//         ) : (
//           <>
//             <h1 className="text-2xl text-[#002E73] font-semibold">{project?.name}</h1>
//             <span className="text-sm text-[#787878]">{project?.description}</span>
//           </>
//         )}

//         <Tabs defaultActiveKey="1" items={projectsRoutes} />
//       </div>
//     </div>
//   );
// };
// export default ProjectIdView;

// const SummaryView = dynamic(() => import('./SummaryView'), {
//   loading: () => <p>Loading...</p>,
// });
// const TasksView = dynamic(() => import('./TasksView'), {
//   loading: () => <p>Loading...</p>,
// });
// const DocumentsView = dynamic(() => import('./DocumentsView'), {
//   loading: () => <p>Loading...</p>,
// });
// const CalendarView = dynamic(() => import('./CalendarView'), {
//   loading: () => <p>Loading...</p>,
// });
