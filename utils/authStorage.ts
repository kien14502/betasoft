enum AUTH_STORAGE_KEY {
  USER_DATA = 'userData',
}

export type AuthStorageKey = keyof typeof AUTH_STORAGE_KEY;

const appStorage = () => {
  const localStorage = typeof window !== 'undefined' ? window.localStorage : null;
  return localStorage;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveAuthStorage = (key: AuthStorageKey, value: any) => {
  const authStorage = appStorage();
  const stringifiedValue = JSON.stringify(value) || '';
  if (authStorage) {
    authStorage.setItem(AUTH_STORAGE_KEY[key], stringifiedValue);
  }
};

const getAuthStorage = <T>(key: AuthStorageKey): T | null => {
  const authStorage = appStorage();
  if (authStorage) {
    const item = authStorage.getItem(AUTH_STORAGE_KEY[key]);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

const removeAuthStorage = (key: AuthStorageKey) => {
  const authStorage = appStorage();
  if (authStorage) {
    authStorage.removeItem(AUTH_STORAGE_KEY[key]);
  }
};

export { saveAuthStorage, getAuthStorage, removeAuthStorage };
