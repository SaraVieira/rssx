import { NextPageWithLayout } from './_app';
import { Toolbar } from '~/components/Videos/Toolbar';

import { useRouter } from 'next/router';

import { Videos } from '~/components/Videos/Videos';
import { Video } from '~/components/Videos/Video';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/outline';
import { VideoForm } from '~/components/Videos/VideoForm';

const VideoPage: NextPageWithLayout = () => {
  const {
    query: { video },
  } = useRouter();

  return (
    <>
      <aside
        className="block flex-shrink-0 order-first h-[250px] xl:h-full"
        style={{
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <div className="h-full relative flex flex-col xl:w-96 border-r border-rssx-border bg-slate-800">
          <div className="flex-shrink-0 hidden xl:block">
            <div className="h-16 bg-rssx-bg px-6 flex flex-col justify-center">
              <div className="flex items-center justify-between space-x-3">
                <h2 className="text-lg font-medium text-rssx-light">Videos</h2>
                <Tippy content="Add a website">
                  <Link
                    href={{
                      query: {
                        video: 'new',
                      },
                    }}
                  >
                    <a className="relative inline-flex items-center px-4 py-2 rounded-md border border-rssx-border bg-rssx-bg text-sm font-medium text-gray-200 hover:bg-rssx-border focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                      <span className="sr-only">Add a video</span>
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </Link>
                </Tippy>
              </div>
            </div>
            <div className="border-t border-b border-rssx-border bg-rssx-bg px-6 py-2 text-sm font-medium text-gray-400">
              Sorted by date
            </div>
          </div>
          <Videos />
        </div>
      </aside>
      <section
        style={{
          maxHeight: 'calc(100vh - 64px)',
        }}
        aria-labelledby="message-heading"
        className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
      >
        {video &&
          (video === 'new' ? (
            <VideoForm />
          ) : (
            <>
              <Toolbar />
              <Video />
            </>
          ))}
      </section>
    </>
  );
};

export default VideoPage;
