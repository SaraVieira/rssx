import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { AppType } from 'next/dist/shared/lib/utils';
import { ReactNode } from 'react';
import superjson from 'superjson';
import { DefaultLayout } from '~/components/DefaultLayout';
import { AppRouter } from '~/server/routers/_app';
import { getAbsoluteUrl } from '~/utils/absoluteUrl';
import { SSRContext } from '~/utils/trpc';
import '../utils/globals.css';
import 'tippy.js/dist/tippy.css';
import { useLatest } from '~/hooks/feeds';
import { SessionProvider, useSession } from 'next-auth/react';
import { LoadingFire } from '~/components/Loading';
import { SearchProvider } from '~/hooks/useSearch';

export type NextPageWithLayout = NextPage & {
  layout?: ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ((props: AppPropsWithLayout) => {
  return (
    <SearchProvider>
      <SessionProvider>
        <App {...props} />
      </SessionProvider>
    </SearchProvider>
  );
}) as AppType;

const App = (({ Component, pageProps }: AppPropsWithLayout) => {
  const { data: session } = useSession();
  const { status } = useLatest();

  const Layout = (Component.layout || DefaultLayout) as any;
  if (status !== 'success' && session?.user) {
    return <LoadingFire />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}) as AppType;

export default withTRPC<AppRouter>({
  ssr: true,
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getAbsoluteUrl()}/api/trpc`,
        }),
      ],
      transformer: superjson,

      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  responseMeta(opts) {
    const ctx = opts.ctx as SSRContext;

    if (ctx.status) {
      return {
        status: ctx.status,
      };
    }

    const error = opts.clientErrors[0];
    if (error) {
      return {
        status: error.data?.httpStatus ?? 500,
      };
    }

    return {};
  },
})(MyApp);
