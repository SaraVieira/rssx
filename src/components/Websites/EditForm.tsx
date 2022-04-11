import { useRouter } from 'next/router';
import { defaultState, useFormState } from '~/hooks/useFormState';
import {
  useAddWebsite,
  useDeleteWebsite,
  useUpdateWebsite,
  useWebsite,
} from '~/hooks/websites';
import { Button, Variants } from '../Button';
import { Input } from '../Input';

export const WebsiteForm = () => {
  const router = useRouter();
  const website = router.query.website as string;
  const { data } = useWebsite({
    id: website,
  });
  const { setFormState, formState } = useFormState({ data, website });

  const addWebsite = useAddWebsite();
  const deleteWebsite = useDeleteWebsite();
  const updateWebsite = useUpdateWebsite();

  const createWebsite = async (e: any) => {
    e.preventDefault();
    try {
      const { id } = await addWebsite.mutateAsync(formState);
      setFormState(defaultState);
      router.push({
        query: {
          website: id,
        },
      });
    } catch {}
  };

  const removeWebsite = async (e: any) => {
    e.preventDefault();
    try {
      await deleteWebsite.mutateAsync({ id: website });
      setFormState(defaultState);
      router.push({
        query: {
          website: null,
        },
      });
    } catch {}
  };

  const editWebsite = async (e: any) => {
    e.preventDefault();
    try {
      await updateWebsite.mutateAsync({ id: website, ...formState });
    } catch {}
  };

  return (
    <div className="bg-rssx-bg pt-5 pb-6 px-4 h-full flex items-start">
      <form
        className="max-w-lg flex-grow"
        onSubmit={(e) => (!data ? createWebsite(e) : editWebsite(e))}
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
            <Button type="submit" variant={Variants.PRIMARY}>
              Update
            </Button>
            <Button
              type="button"
              variant={Variants.DANGER}
              onClick={removeWebsite}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div className="flex space-x-8">
            <Button
              type="submit"
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
