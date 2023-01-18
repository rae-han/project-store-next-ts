import React, { useRef } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@/styles/globals.css';
import '@/styles/normalize.scss';
import '@/styles/commons.scss';

export default function App({ Component, pageProps }: AppProps) {
  // const queryClientRef = useRef<QueryClient>();
  // if (!queryClientRef.current) {
  //   queryClientRef.current = new QueryClient();
  // }
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <meta charSet="utf-8" />
          <title>Menu</title>
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
