import { PlusIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { formatDistance } from 'date-fns';
import { truncate } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFeeds } from '~/hooks/feeds';
import { Button, Variants } from '../Button';
import { EmptyFeeds } from './Empty';
import { SingleFeed } from './SingleFeed';

export const Feeds = ({ later }: { later?: boolean }) => {
  const feedQuery = useFeeds({ later });

  return (
    <nav
      aria-label="Message list"
      className="min-h-0 flex-1 overflow-y-auto w-full bg-rssx-bg"
    >
      {feedQuery.data?.length ? (
        <ul
          role="list"
          className="border-b border-rssx-border divide-y divide-rssx-border"
        >
          {feedQuery.data?.map((item) => (
            <SingleFeed {...item} later={later} key={item.id} />
          ))}
        </ul>
      ) : (
        <EmptyFeeds />
      )}
    </nav>
  );
};
