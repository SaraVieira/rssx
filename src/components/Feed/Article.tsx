import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef } from 'react';
import { useFeed, useToggleRead } from '~/hooks/feeds';

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

          <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
              {message?.read ? 'Read' : 'Unread'}
            </span>
            <Menu as="div" className="ml-3 relative inline-block text-left">
              <div>
                <Menu.Button className="-my-2 p-2 rounded-full bg-rssx-bg flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <span className="sr-only">Open options</span>
                  <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-rssx-bg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={classNames(
                            active
                              ? 'bg-rssx-border text-gray-200'
                              : 'text-rssx-light',
                            'w-full flex justify-between px-4 py-2 text-sm',
                          )}
                        >
                          <span>Copy email address</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-rssx-border text-gray-200'
                              : 'text-rssx-light',
                            'flex justify-between px-4 py-2 text-sm',
                          )}
                        >
                          <span>Previous conversations</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-rssx-border text-gray-200'
                              : 'text-rssx-light',
                            'flex justify-between px-4 py-2 text-sm',
                          )}
                        >
                          <span>View original</span>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
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
