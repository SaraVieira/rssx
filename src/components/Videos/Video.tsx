import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { useVideo } from '~/hooks/videos';
import { ReadIndicator } from '../ReadIndicator';

export const Video = () => {
  const VideoWrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const video = router.query.video as string;
  const { data: currentVideo } = useVideo({ id: video });

  useEffect(() => {
    if (VideoWrapper.current) VideoWrapper.current.scrollTop = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto" ref={VideoWrapper}>
      <div className="bg-rssx-bg pt-5 pb-6">
        <div className="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
          <div className="sm:w-0 sm:flex-1">
            <h1
              id="currentVideo-heading"
              className="text-lg font-medium text-rssx-light"
            >
              {currentVideo?.title}
            </h1>
            <p className="mt-1 text-sm text-gray-400 truncate">
              {currentVideo?.author_name}
            </p>
          </div>
          {currentVideo && (
            <ReadIndicator
              done={currentVideo?.seen}
              doneText={'Seen'}
              notDoneText="Unseen"
            />
          )}
        </div>
        {currentVideo?.html && (
          <div
            className="mt-4 space-y-6 text-sm text-rssx-light px-4 pb-12
        sm:px-6 lg:px-8 article max-w-3xl h-full"
            dangerouslySetInnerHTML={{ __html: currentVideo?.html }}
          ></div>
        )}
      </div>
      <style jsx>{``}</style>
    </div>
  );
};
