import { NextPageWithLayout } from './_app';
import { useFeeds, useLoadAllFeeds } from '~/hooks/feeds';
import { Toolbar } from '~/components/Toolbar';
import { Article } from '~/components/Feed/Article';
import { useRouter } from 'next/router';

import { Feeds } from '~/components/Feed/Feeds';

const IndexPage: NextPageWithLayout = () => {
  const {
    query: { article },
  } = useRouter();
  const feedQuery = useFeeds();
  useLoadAllFeeds();

  return (
    <>
      <section
        style={{
          maxHeight: 'calc(100vh - 64px)',
        }}
        aria-labelledby="message-heading"
        className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
      >
        {article && (
          <>
            <Toolbar />
            <div className="min-h-0 flex-1 overflow-y-auto">
              <Article />
            </div>
          </>
        )}
      </section>

      <aside
        className="hidden xl:block xl:flex-shrink-0 xl:order-first"
        style={{
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <div className="h-full relative flex flex-col w-96 border-r border-rssx-border bg-slate-800">
          <div className="flex-shrink-0">
            <div className="h-16 bg-rssx-bg px-6 flex flex-col justify-center">
              <div className="flex items-baseline space-x-3">
                <h2 className="text-lg font-medium text-rssx-light">Feeds</h2>
                <p className="text-sm font-medium text-gray-400">
                  {feedQuery.unread} unread
                </p>
              </div>
            </div>
            <div className="border-t border-b border-rssx-border bg-rssx-bg px-6 py-2 text-sm font-medium text-gray-400">
              Sorted by date
            </div>
          </div>
          <Feeds />
        </div>
      </aside>
    </>
  );
};

export default IndexPage;
