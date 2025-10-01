import { ModelsMetaData, ModelsUser } from '../api/generated.schemas';
import { getAuthStorage, saveAuthStorage } from './authStorage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateAuthMetaStorage = (value: any, callback: () => void) => {
  const user = getAuthStorage<ModelsUser>('USER_DATA');
  if (user) {
    const updatedUser = { ...user, meta_data: { ...value } };
    saveAuthStorage('USER_DATA', updatedUser);
    return updatedUser;
  } else {
    console.warn('No user data found in storage to update.');
    callback();
  }
  return null;
};

export const getAuthMeta = (): ModelsMetaData | null => {
  const user = getAuthStorage<ModelsUser>('USER_DATA');
  return user?.meta_data ?? null;
};
