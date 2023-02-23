import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { store } from '@/src/store';
import { EnvProvider } from '@/src/contexts/EnvProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <EnvProvider>
        <Component {...pageProps} />
      </EnvProvider>
    </Provider>
  );
}
