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

export { EToken, ERole, EModePage };
