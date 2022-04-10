import { Website } from '@prisma/client';
import { omit } from 'lodash-es';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAddWebsite, useWebsite } from '~/hooks/websites';
import { Button, Variants } from '../Button';
import { Input } from '../Input';

const defaultState = {
  title: '',
  feedUrl: '',
  url: '',
  description: '',
};

export const WebsiteForm = () => {
  const router = useRouter();
  const website = router.query.website as string;
  const { data } = useWebsite({
    id: website,
  });
  const [formState, setFormState] = useState<Omit<Website, 'id'> | any>(
    omit(data, ['id']),
  );
  const addWebsite = useAddWebsite();

  useEffect(() => {
    if (website) {
      if (website === 'new') {
        setFormState(defaultState);
      } else {
        setFormState(data);
      }
    }
  }, [website, data]);

  const createWebsite = async (e: any) => {
    e.preventDefault();
    try {
      await addWebsite.mutateAsync(formState);
      setFormState(defaultState);
    } catch {}
  };
  return (
    <div className="bg-rssx-bg pt-5 pb-6 px-4 h-full flex items-start">
      <form className="max-w-lg flex-grow" onSubmit={createWebsite}>
        <Input
          label="Feed url (required)"
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
            <Button type="button" variant={Variants.DANGER}>
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
