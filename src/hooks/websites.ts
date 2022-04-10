import { trpc } from '~/utils/trpc';

export const useAddWebsite = () => {
  const utils = trpc.useContext();
  const addWebsite = trpc.useMutation('websites.add', {
    async onSuccess() {
      await utils.invalidateQueries(['feeds.all']);
    },
  });

  return addWebsite;
};
