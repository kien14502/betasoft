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
    LAUNCH: '/auth/organizations/launch',
  },
};
