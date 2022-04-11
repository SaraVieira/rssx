import { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';

import { Websites } from '~/components/Websites/Website';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/outline';
import Tippy from '@tippyjs/react';
import { WebsiteForm } from '~/components/Websites/EditForm';

const IndexPage: NextPageWithLayout = () => {
  const {
    query: { website },
  } = useRouter();

  return (
    <>
      <section
        style={{
          maxHeight: 'calc(100vh - 64px)',
        }}
        aria-labelledby="message-heading"
        className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
      >
        {website && (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <WebsiteForm />
            </div>
          </>
        )}
      </section>

      <aside
        className="hidden xl:block xl:flex-shrink-0 xl:order-first"
        style={{
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <div className="h-full relative flex flex-col w-96 border-r  border-rssx-border">
          <div className="flex-shrink-0 border-b border-rssx-border">
            <div className="h-16 bg-rssx-bg px-6 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-rssx-light">
                  Websites
                </h2>

                <Tippy content="Add a website">
                  <Link
                    href={{
                      query: {
                        website: 'new',
                      },
                    }}
                  >
                    <a className="relative inline-flex items-center px-4 py-2 rounded-md border border-rssx-border bg-rssx-bg text-sm font-medium text-gray-200 hover:bg-rssx-border focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                      <span className="sr-only">Add a website</span>
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </Link>
                </Tippy>
              </div>
            </div>
          </div>
          <Websites />
        </div>
      </aside>
    </>
  );
};

export default IndexPage;
