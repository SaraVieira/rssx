import { useRouter } from 'next/router';

import { Button, Variants } from '../Button';
import { Input } from '../Input';
import { useAddVideo } from '~/hooks/videos';
import { useState } from 'react';

export const VideoForm = () => {
  const router = useRouter();
  const [url, setUrl] = useState('');

  const { isLoading: isLoadingAdd, mutateAsync: addVideo } = useAddVideo();

  const createVideo = async (e: any) => {
    e.preventDefault();
    try {
      const { id } = await addVideo({ url });

      router.push({
        query: {
          video: id,
        },
      });
    } catch {}
  };

  return (
    <div className="bg-rssx-bg pt-5 pb-6 px-4 h-full flex items-start">
      <form className="max-w-lg flex-grow" onSubmit={createVideo}>
        <Input
          label={`Youtube link`}
          name="feedUrl"
          required
          placeholder="https://example.com/rss"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="flex space-x-8">
          <Button
            type="submit"
            loading={isLoadingAdd}
            variant={Variants.PRIMARY}
            disabled={!url}
          >
            Add Video
          </Button>
        </div>
      </form>
    </div>
  );
};
