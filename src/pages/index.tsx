import { NextPageWithLayout } from './_app';
import { truncate } from 'lodash-es';
import { formatDistance } from 'date-fns';
import { useFeeds, useLoadAllFeeds } from '~/hooks/feeds';
import { useAddWebsite } from '~/hooks/websites';
import { Toolbar } from '~/components/Toolbar';
import Link from 'next/link';
import { Article } from '~/components/Article';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const IndexPage: NextPageWithLayout = () => {
  const {
    query: { article },
  } = useRouter();
  const feedQuery = useFeeds();
  useLoadAllFeeds();
  const addWebsite = useAddWebsite();

  return (
    <>
      <section
        style={{
          maxHeight: 'calc(100vh - 64px)',
        }}
        aria-labelledby="message-heading"
        className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
      >
        <Toolbar />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Article />
        </div>
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
                <h2 className="text-lg font-medium text-rssx-light">Inbox</h2>
                <p className="text-sm font-medium text-gray-400">
                  {feedQuery.data?.length} messages
                </p>
              </div>
            </div>
            <div className="border-t border-b border-rssx-border bg-rssx-bg px-6 py-2 text-sm font-medium text-gray-400">
              Sorted by date
            </div>
          </div>
          <nav
            aria-label="Message list"
            className="min-h-0 flex-1 overflow-y-auto"
          >
            <ul
              role="list"
              className="border-b border-rssx-border divide-y divide-rssx-border"
            >
              {feedQuery.data?.map((item) => (
                <li
                  className={classNames(
                    'relative bg-rssx-bg py-5 px-6 hover:bg-rssx-border focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600',
                    item.id === article && 'bg-rssx-border',
                  )}
                  key={item.id}
                >
                  <div className="flex justify-between space-x-3">
                    <div className="min-w-0 flex-1">
                      <Link
                        href={{
                          query: {
                            article: item.id,
                          },
                        }}
                      >
                        <a href="#" className="block focus:outline-none">
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                          <p className="text-sm font-medium text-rssx-light truncate">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-400 truncate">
                            {item.creator} for {item.Website?.title}
                          </p>
                        </a>
                      </Link>
                    </div>
                    {item.pubDate && (
                      <time
                        dateTime={item.pubDate}
                        className="flex-shrink-0 whitespace-nowrap text-sm text-gray-400"
                      >
                        {formatDistance(new Date(item.pubDate), new Date(), {
                          addSuffix: true,
                        })}
                      </time>
                    )}
                  </div>
                  <div className="mt-1">
                    <p className="line-clamp-2 text-sm text-gray-400">
                      {truncate(item.contentSnippet || '', { length: 150 })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default IndexPage;

// <form
// onSubmit={async (e) => {
//   e.preventDefault();
//   /**
//    * In a real app you probably don't want to use this manually
//    * Checkout React Hook Form - it works great with tRPC
//    * @link https://react-hook-form.com/
//    */

//   const $url: HTMLInputElement = (e as any).target.elements.url;

//   const input = {
//     url: $url.value,
//   };
//   try {
//     await addWebsite.mutateAsync(input);

//     $url.value = '';
//   } catch {}
// }}
// >
// <label htmlFor="url">Link:</label>
// <br />
// <input
//   id="url"
//   name="url"
//   type="text"
//   disabled={addWebsite.isLoading}
// />

// <br />
// {addWebsite.error && (
//   <p style={{ color: 'red' }}>{addWebsite.error.message}</p>
// )}
// </form>
