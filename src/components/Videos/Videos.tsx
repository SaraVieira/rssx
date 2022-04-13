import { useSearch } from '~/hooks/useSearch';
import { useVideos } from '~/hooks/videos';
import { EmptyVideos } from './Empty';
import { SingleVideo } from './SingleVideo';

export const Videos = () => {
  const feedQuery = useVideos();
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
            <SingleVideo {...item} key={item.id} />
          ))}
        </ul>
      ) : (
        <EmptyVideos search={!!searchActivated} />
      )}
    </nav>
  );
};
