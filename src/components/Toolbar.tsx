import {
  ClipboardCopyIcon,
  ClockIcon,
  ExternalLinkIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  useFeed,
  useFeeds,
  useToggleLater,
  useToggleRead,
} from '~/hooks/feeds';

export const Toolbar = () => {
  const router = useRouter();
  const article = router.query.article as string;
  const toggleRead = useToggleRead({ id: article });
  const toggleLater = useToggleLater({ id: article });
  const { data } = useFeeds({ later: router.pathname === '/saved' });
  const { data: currentArticle } = useFeed({ id: article });
  const currentArticleId =
    data?.findIndex((a) => a.id === article) || (0 as number);

  const actions = useMemo(
    () => [
      {
        title: currentArticle?.read ? 'Mark as unread' : 'Mark as read',

        onClick: () =>
          currentArticle &&
          toggleRead.mutateAsync({
            read: !currentArticle?.read,
            id: article,
          }),
        Icon: XCircleIcon,
      },
      {
        title: currentArticle?.later ? 'Remove from saved' : 'Save for later',
        onClick: () =>
          currentArticle &&
          toggleLater.mutateAsync({
            later: !currentArticle?.later,
            id: article,
          }),
        Icon: ClockIcon,
      },
      {
        title: 'Copy link',
        onClick: () =>
          currentArticle?.link &&
          navigator.clipboard.writeText(currentArticle?.link),
        Icon: ClipboardCopyIcon,
      },
      {
        title: 'Open on website',

        onClick: () =>
          currentArticle?.link && window.open(currentArticle?.link, '_blank'),
        Icon: ExternalLinkIcon,
      },
    ],
    [article, currentArticle, toggleLater, toggleRead],
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
                  {currentArticleId !== 0 && (
                    <Link
                      href={{
                        query: {
                          article: data?.[currentArticleId - 1]?.id,
                        },
                      }}
                    >
                      <a className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-rssx-border bg-rssx-bg text-sm font-medium text-gray-200 hover:bg-rssx-border focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                        <span className="sr-only">Next</span>
                        <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </Link>
                  )}
                  {currentArticleId !== data?.length - 1 && (
                    <Link
                      href={{
                        query: {
                          article: data?.[currentArticleId + 1]?.id,
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
