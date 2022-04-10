import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { MenuIcon } from '@heroicons/react/outline';
import { DesktopNav, MobileMenu } from './Nav';
import { SidebarNav } from './SidebarNav';
import { useNavigation } from '~/hooks/useNaviagtion';
import { useRouter } from 'next/router';
import { Logo } from './Logo';
import Link from 'next/link';

export const DefaultLayout = ({ children }: { children: any }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const sidebarNavigation = useNavigation();

  return (
    <>
      <div className="h-screen flex flex-col">
        {/* Top nav*/}
        <header className="flex-shrink-0 relative h-16 bg-rssx-bg flex items-center">
          {/* Logo area */}
          <div className="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0">
            <Link href="/">
              <a className="flex items-center justify-center h-16 w-16 bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 lg:w-20">
                <Logo width={60} />
              </a>
            </Link>
          </div>
          {/* Picker area */}
          <div className="mx-auto lg:hidden">
            <div className="relative">
              <label htmlFor="inbox-select" className="sr-only">
                Choose page
              </label>
              <select
                id="inbox-select"
                className="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-rssx-light focus:ring-2 focus:ring-blue-600 bg-rssx-border"
                onChange={(e) => router.push(e.target.value)}
              >
                {sidebarNavigation.map((option) => (
                  <option
                    key={option.href}
                    value={option.href}
                    selected={option.current}
                  >
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Menu button area */}
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 lg:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <DesktopNav />
        </header>
        <MobileMenu open={open} setOpen={setOpen} />
        <div className="min-h-0 flex-1 flex overflow-hidden">
          <SidebarNav />
          <main className="min-w-0 flex-1 border-t border-rssx-border h-full xl:flex xl:flex-row flex-col">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
