import { noop } from 'lodash-es';
import { useRouter } from 'next/router';
import { ReactNode, useContext, useMemo, useState, createContext } from 'react';

import { trpc } from '~/utils/trpc';

const SearchContext = createContext({
  data: null,
  search: '',
  setSearch: (a: string) => noop(a),
  isLoading: false,
  searchActivated: false,
});

function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState('');
  const { pathname } = useRouter();
  const { isLoading, data } = trpc.useQuery(
    ['feeds.search', { query: search, saved: pathname === '/saved' }],
    {
      enabled: !!search,
    },
  );
  const value = useMemo(
    () => ({
      search,
      setSearch,
      isLoading,
      data,
      searchActivated: !!search,
    }),
    [data, isLoading, search],
  );
  return (
    // @ts-ignore
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchContext');
  }
  return context;
}

export { SearchProvider, useSearch };
