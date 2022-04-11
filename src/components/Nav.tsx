import { Dialog, Transition } from '@headlessui/react';
import { SearchIcon, XIcon } from '@heroicons/react/solid';

import { Fragment } from 'react';
import { useNavigation } from '~/hooks/useNaviagtion';
import { Logo } from './Logo';

// const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Sign out', href: '#' },
// ];

// const user = {
//   name: 'Whitney Francis',
//   email: 'whitney.francis@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// };

export const DesktopNav = () => {
  return (
    <div className="hidden lg:min-w-0 lg:flex-1 lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <div className="max-w-2xl relative bg-rssx-bg text-gray-400 focus-within:text-gray-400">
          <label htmlFor="desktop-search" className="sr-only">
            Search all feeds
          </label>
          <input
            id="desktop-search"
            type="search"
            placeholder="Search all feeds"
            className="bg-transparent block w-full border-transparent pl-12 placeholder-gray-400 focus:border-transparent sm:text-sm focus:ring-0"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </div>
      {/* <div className="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
        <div className="flex items-center space-x-8">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="bg-rssx-bg rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src={user.imageUrl}
                alt=""
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute z-30 right-0 mt-2 w-56 rounded-md shadow-lg bg-rssx-bg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        )}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        )}
                      >
                        Sign Out
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div> */}
    </div>
  );
};

export const MobileMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const navigation = useNavigation();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 lg:hidden"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-600 sm:bg-opacity-75" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
          enterFrom="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
          enterTo="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
          leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
          leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
          leaveTo="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
        >
          <nav
            className="fixed z-40 inset-0 h-full w-full bg-rssx-bg sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg"
            aria-label="Global"
          >
            <div className="h-16 flex items-center justify-between px-4 sm:px-6">
              <a href="#">
                <Logo className="block h-8 w-auto" />
              </a>
              <button
                type="button"
                className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close main menu</span>
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-2 max-w-8xl mx-auto px-4 sm:px-6">
              <div className="relative text-gray-400 bg-rssx-bg focus-within:text-gray-400">
                <label htmlFor="mobile-search" className="sr-only">
                  Search all feeds
                </label>
                <input
                  id="mobile-search"
                  type="search"
                  placeholder="Search all feeds"
                  className="block w-full bg-transparent border-rssx-border rounded-md pl-10 placeholder-gray-400 focus:border-blue-600 focus:ring-blue-600"
                />
                <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4">
              {navigation.map((item) => (
                <Fragment key={item.name}>
                  <a
                    href={item.href}
                    className="block rounded-md py-2 px-3 text-base font-medium text-rssx-light hover:bg-rssx-border"
                  >
                    {item.name}
                  </a>
                </Fragment>
              ))}
            </div>
            {/* <div className="border-t border-rssx-border pt-4 pb-3">
              <div className="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <div className="text-base font-medium text-rssx-light truncate">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400 truncate">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">
                {userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div> */}
          </nav>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
