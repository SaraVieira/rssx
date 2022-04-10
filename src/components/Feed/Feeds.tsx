import classNames from 'classnames';
import { formatDistance } from 'date-fns';
import { truncate } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFeeds } from '~/hooks/feeds';

export const Feeds = ({ later }: { later?: boolean }) => {
  const feedQuery = useFeeds({ later });
  const {
    query: { article },
  } = useRouter();

  return (
    <nav aria-label="Message list" className="min-h-0 flex-1 overflow-y-auto">
      <ul
        role="list"
        className="border-b border-rssx-border divide-y divide-rssx-border"
      >
        {feedQuery.data?.map((item) => (
          <li
            className={classNames(
              ' bg-rssx-border py-5 px-6 hover:bg-rssx-bg focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 relative',
              (item.id === article || (!later && item.read)) && '!bg-rssx-bg',
            )}
            key={item.id}
          >
            <div className="w-2 h-full absolute left-0 top-0">
              {!item.read ? (
                <div className="w-2 h-full bg-cyan-400 border border-cyan-600" />
              ) : null}
            </div>
            <div className="flex justify-between space-x-3">
              <div className="min-w-0 flex-1">
                <Link
                  href={{
                    query: {
                      article: item.id,
                    },
                  }}
                >
                  <a className="block focus:outline-none">
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
  );
};
