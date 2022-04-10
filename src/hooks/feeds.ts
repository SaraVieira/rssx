import { useEffect } from 'react';
import { trpc } from '~/utils/trpc';

export const useFeeds = ({ later }: { later?: boolean } = {}) => {
  const feedQuery = trpc.useQuery(!later ? ['feeds.all'] : ['feeds.saved']);

  return {
    ...feedQuery,
    unread: (feedQuery?.data || []).filter((d) => d.read === false).length,
  };
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

export const useLoadSavedAllFeeds = () => {
  const utils = trpc.useContext();
  const feedQuery = useFeeds({ later: true });

  useEffect(() => {
    for (const { id } of feedQuery.data ?? []) {
      utils.prefetchQuery(['feeds.byId', { id }]);
    }
  }, [feedQuery.data, utils]);
};

export const useFeed = ({ id }: { id: string }) => {
  const feed = trpc.useQuery(['feeds.byId', { id }], {
    enabled: !!id,
  });

  return feed;
};

export const useToggleRead = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const toggleRead = trpc.useMutation('feeds.toggleRead', {
    async onSuccess() {
      await utils.invalidateQueries(['feeds.all']);
      await utils.invalidateQueries(['feeds.byId', { id }]);
    },
  });

  return toggleRead;
};

export const useToggleLater = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const toggleLater = trpc.useMutation('feeds.toggleLater', {
    async onSuccess() {
      await utils.invalidateQueries(['feeds.saved']);
      await utils.invalidateQueries(['feeds.byId', { id }]);
    },
  });

  return toggleLater;
};
