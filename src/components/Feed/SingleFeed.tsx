import { Website } from '@prisma/client';
import classNames from 'classnames';
import { formatDistance } from 'date-fns';
import { truncate } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const SingleFeed = ({
  id,
  read,
  creator,
  Website,
  pubDate,
  later,
  title,
  contentSnippet,
}: {
  later: boolean | undefined;
  key: string;
  id: string;
  read: boolean;
  creator: string | null;
  Website: Website | null;
  pubDate: string | null;
  title: string | null;
  contentSnippet: string | null;
}) => {
  const {
    query: { article },
  } = useRouter();

  return (
    <li
      className={classNames(
        ' bg-rssx-border py-5 px-6 hover:bg-rssx-bg focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 relative',
        (id === article || (!later && read)) && '!bg-rssx-bg',
      )}
    >
      <div className="w-2 h-full absolute left-0 top-0">
        {!read ? (
          <div className="w-2 h-full bg-cyan-400 border border-cyan-600" />
        ) : null}
      </div>
      <div className="flex justify-between space-x-3">
        <div className="min-w-0 flex-1">
          <Link
            href={{
              query: {
                article: id,
              },
            }}
          >
            <a className="block focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true"></span>
              <p className="text-sm font-medium text-rssx-light truncate">
                {title}
              </p>
              <p className="text-sm text-gray-400 truncate">
                {creator} for {Website?.title}
              </p>
            </a>
          </Link>
        </div>
        {pubDate && (
          <time
            dateTime={pubDate}
            className="flex-shrink-0 whitespace-nowrap text-sm text-gray-400"
          >
            {formatDistance(new Date(pubDate), new Date(), {
              addSuffix: true,
            })}
          </time>
        )}
      </div>
      <div className="mt-1">
        <p className="line-clamp-2 text-sm text-gray-400">
          {truncate(contentSnippet || '', { length: 150 })}
        </p>
      </div>
    </li>
  );
};
