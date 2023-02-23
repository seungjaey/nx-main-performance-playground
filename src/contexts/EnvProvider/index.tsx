import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

const EnvContext = createContext(initialState);

interface Props {
  children?: ReactNode;
}

export const EnvProvider = ({ children }: Props) => {
  const [value, setValue] = useState(initialState);
  const { env, sub } = value;
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
