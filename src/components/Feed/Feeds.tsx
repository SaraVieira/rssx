import { useFeeds } from '~/hooks/feeds';
import { useSearch } from '~/hooks/useSearch';
import { EmptyFeeds } from './Empty';
import { SingleFeed } from './SingleFeed';

export const Feeds = ({ later }: { later?: boolean }) => {
  const feedQuery = useFeeds({ later });
  const { data: search, searchActivated } = useSearch();
  const toUse = searchActivated ? search : feedQuery?.data;
  return (
    <nav
      aria-label="Message list"
      className="min-h-0 flex-1 overflow-y-auto w-full bg-rssx-bg"
    >
      {toUse?.length ? (
        <ul
          role="list"
          className="border-b border-rssx-border divide-y divide-rssx-border"
        >
          {toUse?.map((item) => (
            <SingleFeed {...item} later={later} key={item.id} />
          ))}
        </ul>
      ) : (
        <EmptyFeeds search={!!searchActivated} />
      )}
    </nav>
  );
};
