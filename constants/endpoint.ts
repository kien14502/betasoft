export const API_ENDPOINT = {
  ROOT: '',
  AUTH: {
    PROFILE: '/auth/user/profile',
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
  },
  PROJECT: {
    '': '/auth/projects',
    MY_PROJ: '/auth/projects/my-projects',
  },
};
