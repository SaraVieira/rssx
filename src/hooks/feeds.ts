import { useEffect } from 'react';
import { trpc } from '~/utils/trpc';

export const useFeeds = () => {
  const feedQuery = trpc.useQuery(['feeds.all']);

  return feedQuery;
};

export const useLoadAllFeeds = () => {
  const utils = trpc.useContext();
  const feedQuery = useFeeds();

  useEffect(() => {
    for (const { id } of feedQuery.data ?? []) {
      utils.prefetchQuery(['feeds.byId', { id }]);
    }
  }, [feedQuery.data, utils]);
};

export const useFeed = ({ id }: { id: string }) => {
  const feed = trpc.useQuery(['feeds.byId', { id }]);

  return feed;
};
