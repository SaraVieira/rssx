import {
  ClockIcon,
  CogIcon,
  GlobeIcon,
  RssIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useNavigation = () => {
  const { pathname } = useRouter();

  const sidebarNavigation = useMemo(
    () => [
      { name: 'Feed', href: '/', icon: RssIcon, current: pathname === '/' },
      {
        name: 'Saved',
        href: '/saved',
        icon: ClockIcon,
        current: pathname === '/saved',
      },
      {
        name: 'Sources',
        href: '/sources',
        icon: GlobeIcon,
        current: pathname === '/sources',
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: CogIcon,
        current: pathname === '/settings',
      },
    ],
    [pathname],
  );

  return sidebarNavigation;
};
