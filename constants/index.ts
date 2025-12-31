enum ERole {
  ADMIN = 'admin',
  USER = 'member',
}

enum EModePage {
  EDIT = 'edit',
  VIEW = 'view',
}

enum EToken {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

enum EUrgency {
  // HIGHEST = 'highest',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  // LOWEST = 'lowest',
}

enum EWorkspaceSizes {
  '2_5' = 5,
  '6-10' = 10,
  '11-20' = 20,
  '21-50' = 50,
  '51-100' = 100,
  '101-250' = 250,
  '250-mo' = 1000,
}

export const wsSizeOptions = [
  { label: '2 - 5', value: 5 },
  { label: '6 - 10', value: 10 },
  { label: '11 - 20', value: 20 },
  { label: '21 - 50', value: 50 },
  { label: '51 - 100', value: 100 },
  { label: '101 - 250', value: 250 },
  { label: '250 - more', value: 1000 },
];

enum EWorkSpaceRegion {
  'us-east' = 'US East',
  'us-west' = 'US West',
  'eu-central' = 'EU Central',
  'asia' = 'Asia Pacific',
}

enum EWorkSpaceIndustry {
  Technology = 'Technology',
  Healthcare = 'Healthcare',
  Finance = 'Finance',
  Education = 'Education',
  Retail = 'Retail',
  Manufacturing = 'Manufacturing',
  Consulting = 'Consulting',
}

enum ESocketAction {
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  JOIN_USER = 'joinUser',
  SEND_MESSAGE = 'sendMessage',
  START_TYPING = 'startTyping',
  STOP_TYPING = 'stopTyping',
  TOGGLE_ONLINE = 'toggleOnline',
  TOGGLE_OFFLINE = 'toggleOffline',
  NEW_MESSAGE = 'new_message',
  NEW_ROOM = 'new_room',
}

export {
  EToken,
  ERole,
  EModePage,
  EUrgency,
  EWorkspaceSizes,
  EWorkSpaceRegion,
  EWorkSpaceIndustry,
  ESocketAction,
};
