import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

// Type for the hook return value
type UsePersistentStateReturn<T> = [T, Dispatch<SetStateAction<T>>, () => void];

/**
 * Custom hook for persistent state with localStorage
 * @param key - The localStorage key
 * @param initialValue - The initial value if no stored value exists
 * @returns A tuple of [state, setState, clearState]
 */
export function usePersistentState<T>(key: string, initialValue: T): UsePersistentStateReturn<T> {
  // Initialize state with stored value or initial value
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, state]);

  // Sync state across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === key && e.newValue !== null) {
        try {
          setState(JSON.parse(e.newValue) as T);
        } catch (error) {
          console.error(`Error syncing ${key} from storage event:`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  // Clear function
  const clearState = useCallback((): void => {
    try {
      window.localStorage.removeItem(key);
      setState(initialValue);
    } catch (error) {
      console.error(`Error clearing ${key} from localStorage:`, error);
    }
  }, [key, initialValue]);

  return [state, setState, clearState];
}
