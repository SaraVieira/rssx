import { trpc } from '~/utils/trpc';

export const useVideos = () => {
  const feedQuery = trpc.useQuery(['videos.all']);

  return feedQuery;
};

export const useVideo = ({ id }: { id: string }) => {
  const video = trpc.useQuery(['videos.byId', { id }], {
    enabled: !!id,
  });

  return video;
};

export const useAddVideo = () => {
  const utils = trpc.useContext();
  const addVideo = trpc.useMutation('videos.add', {
    async onSuccess() {
      await utils.invalidateQueries(['videos.all']);
    },
  });

  return addVideo;
};
export const useDeleteVideo = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const utils = trpc.useContext();
  const addSource = trpc.useMutation('videos.delete', {
    async onSuccess() {
      await utils.invalidateQueries(['videos.all']);
      onSuccess && onSuccess();
    },
  });

  return addSource;
};

export const useToggleSeen = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const toggleRead = trpc.useMutation('videos.toggleSeen', {
    async onSuccess() {
      await utils.invalidateQueries(['videos.all']);
      await utils.invalidateQueries(['videos.byId', { id }]);
    },
  });

  return toggleRead;
};
