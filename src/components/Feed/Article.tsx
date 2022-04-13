import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useFeed, useToggleRead } from '~/hooks/feeds';
import { ReadIndicator } from '../ReadIndicator';

export const Article = () => {
  const articleWrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const article = router.query.article as string;
  const toggleRead = useToggleRead({ id: article });
  const { data: message } = useFeed({ id: article });

  useEffect(() => {
    if (!message?.read) {
      window.setTimeout(() => {
        toggleRead.mutateAsync({ id: article, read: true });
      }, 3000);
    }
    if (articleWrapper.current) articleWrapper.current.scrollTop = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto" ref={articleWrapper}>
      <div className="bg-rssx-bg pt-5 pb-6">
        <div className="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
          <div className="sm:w-0 sm:flex-1">
            <h1
              id="message-heading"
              className="text-lg font-medium text-rssx-light"
            >
              {message?.title}
            </h1>
            <p className="mt-1 text-sm text-gray-400 truncate">
              {message?.creator} for {message?.Source?.title}
            </p>
          </div>

          {message && <ReadIndicator done={message?.read} />}
        </div>
        {message?.content && (
          <div
            className="mt-4 space-y-6 text-sm text-rssx-light px-4 pb-12
        sm:px-6 lg:px-8 article max-w-3xl"
            dangerouslySetInnerHTML={{ __html: message?.content }}
          ></div>
        )}
      </div>
    </div>
  );
};
