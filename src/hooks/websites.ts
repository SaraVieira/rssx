import { trpc } from '~/utils/trpc';

export const useAddWebsite = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const utils = trpc.useContext();
  const addWebsite = trpc.useMutation('websites.add', {
    async onSuccess() {
      await utils.invalidateQueries(['websites.all']);
      onSuccess && onSuccess();
    },
  });

  return addWebsite;
};
export const useWebsites = () => {
  const websiteQuery = trpc.useQuery(['websites.all']);

  return websiteQuery;
};

export const useWebsite = ({ id }: { id: string }) => {
  const website = trpc.useQuery(['websites.byId', { id }], {
    enabled: !!id && id !== 'new',
  });

  return website;
};

export const useDeleteWebsite = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const utils = trpc.useContext();
  const addWebsite = trpc.useMutation('websites.delete', {
    async onSuccess() {
      await utils.invalidateQueries(['websites.all']);
      onSuccess && onSuccess();
    },
  });

  return addWebsite;
};

export const useUpdateWebsite = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const utils = trpc.useContext();
  const addWebsite = trpc.useMutation('websites.update', {
    async onSuccess() {
      await utils.invalidateQueries(['websites.all']);
      onSuccess && onSuccess();
    },
  });

  return addWebsite;
};
