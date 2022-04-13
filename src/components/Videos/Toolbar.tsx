import {
  ClipboardCopyIcon,
  ExternalLinkIcon,
  PlayIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  useDeleteVideo,
  useToggleSeen,
  useVideo,
  useVideos,
} from '~/hooks/videos';

export const Toolbar = () => {
  const router = useRouter();
  const video = router.query.video as string;
  const deleteVideo = useDeleteVideo();
  const toggleSeen = useToggleSeen({ id: video });
  const { data } = useVideos();
  const { data: currentVideo } = useVideo({ id: video });
  const currentVideoId =
    data?.findIndex((a) => a.id === video) || (0 as number);

  console.log(currentVideo);

  const actions = useMemo(
    () => [
      {
        title: currentVideo?.seen ? 'Mark as unseen' : 'Mark as seen',

        onClick: () =>
          currentVideo &&
          toggleSeen.mutateAsync({
            seen: !currentVideo?.seen,
            id: video,
          }),
        Icon: PlayIcon,
      },
      {
        title: 'Copy link',
        onClick: () =>
          currentVideo?.url && navigator.clipboard.writeText(currentVideo?.url),
        Icon: ClipboardCopyIcon,
      },
      {
        title: 'Open on website',

        onClick: () =>
          currentVideo?.url && window.open(currentVideo?.url, '_blank'),
        Icon: ExternalLinkIcon,
      },
      {
        title: 'Remove',

        onClick: () => {
          currentVideo &&
            deleteVideo.mutateAsync({
              id: video,
            });
          router.push('/videos');
        },
        Icon: XCircleIcon,
      },
    ],
    [currentVideo, deleteVideo, router, toggleSeen, video],
  );

  return (
    <div className="flex-shrink-0 bg-rssx-bg border-b border-rssx-border">
      {/* Toolbar*/}
      <div className="h-16 flex flex-col justify-center">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="py-3 flex justify-between">
            {/* Left buttons */}
            <div>
              <span className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
                <span className="inline-flex sm:shadow-sm">
                  {actions.map(({ Icon, ...action }, i) => (
                    <button
                      key={action.title}
                      type="button"
                      className={classNames(
                        'relative inline-flex items-center px-4 py-2 border border-rssx-border bg-rssx-bg text-sm font-medium text-rssx-light hover:bg-rssx-border focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600',
                        i === 0 && 'rounded-l-md',
                        i === actions.length - 1 && 'rounded-r-md',
                      )}
                      {...action}
                    >
                      <Icon
                        className="mr-2.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>{action.title}</span>
                    </button>
                  ))}
                </span>
              </span>
            </div>

            {data?.length && (
              <nav aria-label="Pagination">
                <span className="relative z-0 inline-flex shadow-sm rounded-md">
                  {currentVideoId !== 0 && (
                    <Link
                      href={{
                        query: {
                          article: data?.[currentVideoId - 1]?.id,
                        },
                      }}
                    >
                      <a className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-rssx-border bg-rssx-bg text-sm font-medium text-gray-200 hover:bg-rssx-border focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                        <span className="sr-only">Next</span>
                        <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </Link>
                  )}
                  {currentVideoId !== data?.length - 1 && (
                    <Link
                      href={{
                        query: {
                          article: data?.[currentVideoId + 1]?.id,
                        },
                      }}
                    >
                      <a className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-rssx-border bg-rssx-bg text-sm font-medium text-gray-200 hover:bg-rssx-border focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                        <span className="sr-only">Previous</span>
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </Link>
                  )}
                </span>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
