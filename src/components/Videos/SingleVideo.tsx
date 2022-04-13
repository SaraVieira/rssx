import { Video } from '@prisma/client';
import classNames from 'classnames';
import { formatDistance } from 'date-fns';

import Link from 'next/link';
import { useRouter } from 'next/router';

export const SingleVideo = (singleVideo: Video) => {
  const {
    query: { video },
  } = useRouter();

  return (
    <li
      className={classNames(
        ' bg-rssx-border py-5 px-6 hover:bg-rssx-bg focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 relative',
        singleVideo.id === video && '!bg-rssx-bg',
      )}
    >
      <div className="w-2 h-full absolute left-0 top-0">
        {!singleVideo.seen ? (
          <div className="w-2 h-full bg-cyan-400 border border-cyan-600" />
        ) : null}
      </div>
      <div className="flex justify-between space-x-3">
        <div className="min-w-0 flex-1">
          <Link
            href={{
              query: {
                video: singleVideo.id,
              },
            }}
          >
            <a className="block focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true"></span>
              <p className="text-sm font-medium text-rssx-light truncate">
                {singleVideo.title}
              </p>
              <p className="text-sm text-gray-400 truncate">
                {singleVideo.author_name}
              </p>
            </a>
          </Link>
        </div>
        {singleVideo.createdAt && (
          <time className="flex-shrink-0 whitespace-nowrap text-sm text-gray-400">
            {formatDistance(new Date(singleVideo.createdAt), new Date(), {
              addSuffix: true,
            })}
          </time>
        )}
      </div>
    </li>
  );
};
