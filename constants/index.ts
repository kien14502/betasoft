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

export {
  EToken,
  ERole,
  EModePage,
  EUrgency,
  EWorkspaceSizes,
  EWorkSpaceRegion,
  EWorkSpaceIndustry,
};
