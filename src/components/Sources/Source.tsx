import classNames from 'classnames';
import { truncate } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSources } from '~/hooks/sources';

export const Sources = () => {
  const sourceQuery = useSources();
  const {
    query: { source },
  } = useRouter();
  return (
    <nav
      aria-label="Website list"
      className="min-h-0 flex-1 h-full overflow-y-auto"
    >
      <ul
        role="list"
        className="border-b border-rssx-border divide-y divide-rssx-border h-full bg-rssx-bg"
      >
        {sourceQuery.data?.map((item: any) => (
          <li
            className={classNames(
              'relative bg-rssx-bg py-5 px-6 hover:bg-rssx-border focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 ',
              item.id === source && 'bg-rssx-border',
            )}
            key={item.id}
          >
            <Link
              href={{
                query: {
                  source: item.id,
                },
              }}
            >
              <a className="flex space-x-4 items-center">
                <img
                  src={item.favicon}
                  width={24}
                  alt={item.title}
                  className="w-6 h-6"
                />
                <div>
                  <div className="flex justify-between space-x-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-rssx-light truncate">
                        {item.title}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="line-clamp-2 text-sm text-gray-400">
                      {truncate(item.description || '', { length: 150 })}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
