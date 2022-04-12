import { useRouter } from 'next/router';
import { defaultState, useFormState } from '~/hooks/useFormState';
import {
  useAddSource,
  useDeleteSource,
  useUpdateSource,
  useSource,
} from '~/hooks/sources';
import { Button, Variants } from '../Button';
import { Input } from '../Input';

export const SourceForm = () => {
  const router = useRouter();
  const source = router.query.source as string;
  const { data } = useSource({
    id: source,
  });
  const { setFormState, formState } = useFormState({ data, source });

  const { isLoading: isLoadingAdd, mutateAsync: addSource } = useAddSource();
  const { isLoading: isLoadingDelete, mutateAsync: deleteSource } =
    useDeleteSource();
  const { isLoading: isLoadingUpdate, mutateAsync: updateSource } =
    useUpdateSource();

  const createSource = async (e: any) => {
    e.preventDefault();
    try {
      const { id } = await addSource(formState);
      setFormState(defaultState);
      router.push({
        query: {
          source: id,
        },
      });
    } catch {}
  };

  const removeSource = async (e: any) => {
    e.preventDefault();
    try {
      await deleteSource({ id: source });
      setFormState(defaultState);
      router.push({
        query: {
          source: null,
        },
      });
    } catch {}
  };

  const editSource = async (e: any) => {
    e.preventDefault();
    try {
      await updateSource({ id: source, ...formState });
    } catch {}
  };

  return (
    <div className="bg-rssx-bg pt-5 pb-6 px-4 h-full flex items-start">
      <form
        className="max-w-lg flex-grow"
        onSubmit={(e) => (!data ? createSource(e) : editSource(e))}
      >
        <Input
          label={`Feed url ${data ? '' : '(required)'}`}
          name="feedUrl"
          required
          placeholder="https://example.com/rss"
          type="url"
          value={formState?.feedUrl}
          onChange={(e) =>
            setFormState((curr: any) => ({
              ...curr,
              feedUrl: e.target.value,
            }))
          }
        />
        <Input
          label="Website title"
          name="title"
          placeholder="The awesome website"
          value={formState?.title}
          onChange={(e) =>
            setFormState((curr: any) => ({
              ...curr,

              title: e.target.value,
            }))
          }
        />
        <Input
          label="Website description"
          name="description"
          placeholder="The awesome website is really awesome"
          value={formState?.description}
          onChange={(e) =>
            setFormState((curr: any) => ({
              ...curr,
              description: e.target.value,
            }))
          }
        />
        <Input
          label="Homepage"
          name="url"
          placeholder="https://example.com"
          type="url"
          value={formState?.url}
          onChange={(e) =>
            setFormState((curr: any) => ({
              ...curr,
              url: e.target.value,
            }))
          }
        />

        {data ? (
          <div className="flex space-x-8">
            <Button
              type="submit"
              variant={Variants.PRIMARY}
              loading={isLoadingUpdate}
            >
              Update
            </Button>
            <Button
              loading={isLoadingDelete}
              type="button"
              variant={Variants.DANGER}
              onClick={removeSource}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div className="flex space-x-8">
            <Button
              type="submit"
              loading={isLoadingAdd}
              variant={Variants.PRIMARY}
              disabled={!formState?.feedUrl}
            >
              Add Website
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
