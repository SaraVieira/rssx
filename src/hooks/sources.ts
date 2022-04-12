import { trpc } from '~/utils/trpc';

export const useAddSource = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const utils = trpc.useContext();
  const addSource = trpc.useMutation('sources.add', {
    async onSuccess() {
      await utils.invalidateQueries(['sources.all']);
      onSuccess && onSuccess();
    },
  });

  return addSource;
};
export const useSources = () => {
  const sourceQuery = trpc.useQuery(['sources.all']);

  return sourceQuery;
};

export const useSource = ({ id }: { id: string }) => {
  const source = trpc.useQuery(['sources.byId', { id }], {
    enabled: !!id && id !== 'new',
  });

  return source;
};

export const useDeleteSource = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const utils = trpc.useContext();
  const addSource = trpc.useMutation('sources.delete', {
    async onSuccess() {
      await utils.invalidateQueries(['sources.all']);
      onSuccess && onSuccess();
    },
  });

  return addSource;
};

export const useUpdateSource = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const utils = trpc.useContext();
  const addSource = trpc.useMutation('sources.update', {
    async onSuccess() {
      await utils.invalidateQueries(['sources.all']);
      onSuccess && onSuccess();
    },
  });

  return addSource;
};
