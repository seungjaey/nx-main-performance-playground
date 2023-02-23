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
  window.addEventListener('resize', cb);
  return () => {
    window.removeEventListener('resize', cb);
  };
};

const getSnapshot = () => {
  return checkBrowserEnv() ? window.innerWidth : STATUS.UN_SET;
};

export const useWindowInnerWidth = () => {
  const innerWidth = useSyncExternalStore(subscribe, getSnapshot);
  return innerWidth;
};
