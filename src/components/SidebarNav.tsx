import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import Link from 'next/link';
import { useNavigation } from '~/hooks/useNaviagtion';

export const SidebarNav = () => {
  const sidebarNavigation = useNavigation();
  return (
    <nav
      aria-label="Sidebar"
      className="hidden lg:block lg:flex-shrink-0 lg:bg-gray-800 lg:overflow-y-auto"
    >
      <div className="relative w-20 flex flex-col p-3 space-y-3">
        {sidebarNavigation.map((item) => (
          <Tippy content={item.name} key={item.name}>
            <div>
              <Link href={item.href}>
                <a
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-400 hover:bg-gray-700',
                    'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg',
                  )}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              </Link>
            </div>
          </Tippy>
        ))}
      </div>
    </nav>
  );
};
