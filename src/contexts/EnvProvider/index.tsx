import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { check } from '@fxts/core/dist/types/types/Test';

type EnvType = 'BROWSER' | 'NODE' | 'UNSET';
type SubEnvType = 'NONE' | 'WEB' | 'MOBILE_WEB' | 'WEBVIEW';

const ENV: Record<EnvType, EnvType> = {
  BROWSER: 'BROWSER',
  NODE: 'NODE',
  UNSET: 'UNSET',
};

const SUB_ENV: Record<SubEnvType, SubEnvType> = {
  NONE: 'NONE',
  WEB: 'WEB',
  MOBILE_WEB: 'MOBILE_WEB',
  WEBVIEW: 'WEBVIEW',
};

const initialState = {
  env: ENV.UNSET,
  sub: SUB_ENV.NONE,
};

const checkBrowserEnv = () => {
  try {
    return typeof window !== 'undefined';
  } catch (error) {
    return false;
  }
};

const EnvContext = createContext(initialState);

const getWindowProxy = () => {
  if (!checkBrowserEnv()) {
    return;
  }
  return Object.defineProperty(window, 'webview', {
    get() {
      return window.webview;
    },
    set(loading) {
      window.webview = loading;
    },
  });
};

const subscribe = (cb) => {
  if (!checkBrowserEnv()) {
    return () => {};
  }

  return () => {};
};

const getSnapShot = () => {
  if (checkBrowserEnv()) {
    return window.webview;
  }
  return 'UNSET';
};

interface Props {
  children?: ReactNode;
}

export const EnvProvider = ({ children }: Props) => {
  const [value, setValue] = useState(initialState);
  const { env, sub } = value;
  const webview = useSyncExternalStore(subscribe, getSnapShot);
  console.log(webview);
  useEffect(() => {
    const timerId = setInterval(() => {
      console.log('hit');
      if (window?.webview && sub !== SUB_ENV.WEBVIEW) {
        console.log('set as webview');
        setValue((prev) => ({
          ...prev,
          sub: SUB_ENV.WEBVIEW,
        }));
      }
    }, 300);
    return () => {
      window?.clearInterval(timerId);
    };
  }, [env, sub]);
  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>;
};

export const useWebview = () => {
  const { env, sub } = useContext(EnvContext);
  if (env !== ENV.BROWSER || sub !== SUB_ENV.WEBVIEW) {
    return false;
  }
  return true;
};
