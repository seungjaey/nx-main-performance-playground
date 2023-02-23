import { useSyncExternalStore } from 'use-sync-external-store/shim';

type SubscribeFn = (onStoreChange: () => void) => () => void;

const checkBrowserEnv = () => {
  try {
    return typeof window !== 'undefined';
  } catch (error) {
    return false;
  }
};

const STATUS = {
  UN_SET: 'UN_SET',
};

const subscribe: SubscribeFn = (cb) => {
  console.log('subscribe in');
  window.addEventListener('beforeunload', cb);
  return () => {
    console.log('subscribe out');
    window.removeEventListener('beforeunload', cb);
  };
};

const getSnapshot = () => {
  console.log('snapshot called');
  return checkBrowserEnv() ? window.navigator.userAgent : STATUS.UN_SET;
};

export const useUserAgent = () => {
  const userAgent = useSyncExternalStore(subscribe, getSnapshot);

  return userAgent;
};
