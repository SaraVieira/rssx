import { Menu, Transition } from '@headlessui/react';
import {
  ArchiveIcon as ArchiveIconSolid,
  ChevronDownIcon,
  ChevronUpIcon,
  FolderDownloadIcon,
  PencilIcon,
  ReplyIcon,
  UserAddIcon,
} from '@heroicons/react/solid';
import classNames from 'classnames';
import { noop } from 'lodash-es';
import { Fragment } from 'react';

const actions = [
  {
    title: 'Reply',
    onClick: noop,
    Icon: ReplyIcon,
  },
  {
    title: 'Note',
    onClick: noop,
    Icon: PencilIcon,
  },
  {
    title: 'Assign',
    onClick: noop,
    Icon: UserAddIcon,
  },
];

export const Toolbar = () => (
  <div className="flex-shrink-0 bg-rssx-bg border-b border-rssx-border">
    {/* Toolbar*/}
    <div className="h-16 flex flex-col justify-center">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="py-3 flex justify-between">
          {/* Left buttons */}
          <div>
            <span className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
              <span className="inline-flex sm:shadow-sm">
                {actions.map(({ Icon, ...action }) => (
                  <button
                    key={action.title}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-rssx-border bg-rssx-bg text-sm font-medium text-rssx-light hover:bg-rssx-border focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
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

              <Menu
                as="span"
                className="-ml-px relative block sm:shadow-sm lg:hidden"
              >
                <div>
                  <Menu.Button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-rssx-border bg-rssx-bg text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:rounded-md sm:px-3">
                    <span className="sr-only sm:hidden">More</span>
                    <span className="hidden sm:inline">More</span>
                    <ChevronDownIcon
                      className="h-5 w-5 text-gray-100 sm:ml-2 sm:-mr-1"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-rssx-bg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block sm:hidden px-4 py-2 text-sm',
                            )}
                          >
                            Note
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block sm:hidden px-4 py-2 text-sm',
                            )}
                          >
                            Assign
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Archive
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Move
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </span>
          </div>

          {/* Right buttons */}
          <nav aria-label="Pagination">
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-rssx-border bg-rssx-bg text-sm font-medium text-gray-200 hover:bg-rssx-border focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              >
                <span className="sr-only">Next</span>
                <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-rssx-border bg-rssx-bg text-sm font-medium text-gray-200 hover:bg-rssx-border focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              >
                <span className="sr-only">Previous</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </span>
          </nav>
        </div>
      </div>
    </div>
    {/* Message header */}
  </div>
);
