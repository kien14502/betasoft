export const API_ENDPOINT = {
  ROOT: '',
  AUTH: {
    PROFILE: '/auth/user/profile',
    REGISTER: '/auth/register',
    SEARCH_USER: '/auth/user/search',
  },
  ROOM: {
    GET_ROOMS: 'auth/chat/rooms',
    GET_ROOM: (id: string) => `/auth/chat/rooms/${id}/messages`,
  },
  WORKSPACE: {
    '': '/auth/organizations',
    LAUNCH: '/auth/organizations/launch',
    JOIN: '/auth/organizations/join',
    INVITE_MEMBER: '/auth/organizations/invite',
    MEMBER: '',
  },
  PROJECT: {
    '': '/auth/projects',
    MY_PROJ: '/auth/projects/my-projects',
    MEMBER: (prj_id: string) => `/auth/projects/${prj_id}/members`,
  },
  TASK: {
    '': '/auth/tasks',
    TASK: (org_id: string) => `/auth/projects/${org_id}/tasks`,
    KANBAN: (org_id: string) => `/auth/projects/${org_id}/kanban`,
    MOVE_TASK: 'auth/tasks/move',
    SECTION: {
      '': '/auth/task-lists',
    },
    COMMENT: {
      GET: (prj_id: string) => `/auth/tasks/${prj_id}/comments`,
      CREATE: '/auth/tasks/comments',
      DELETE: '/auth/tasks/comments',
    },
    SUBTASKS: {
      GET: (project_id: string, task_id: string) => `/auth/tasks/${project_id}/${task_id}`,
    },
  },
};
