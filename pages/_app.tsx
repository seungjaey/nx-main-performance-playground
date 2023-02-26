import { Provider } from 'react-redux';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isUndefined } from 'lodash';

import { store } from '@/src/store';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry(failureCount, error) {
              if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError;
                if (isUndefined(response)) {
                  return false;
                }
                if (response.status === 400 || response.status === 404) {
                  return false;
                }
              }
              return failureCount < 2;
            },
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
