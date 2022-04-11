import { PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { Button, Variants } from '../Button';

export const EmptyFeeds = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full justify-center items-center flex">
      <div className="text-center">
        <svg
          width="100pt"
          height="100pt"
          version="1.1"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-12 w-12 text-gray-400"
          fill="currentColor"
        >
          <g>
            <path d="m22.898 67.398c0 3.8828 2.3398 7.3867 5.9297 8.8711 3.5859 1.4844 7.7148 0.66406 10.461-2.082 2.7461-2.7461 3.5664-6.875 2.082-10.461-1.4883-3.5859-4.9883-5.9258-8.8711-5.9258-5.3008 0-9.6016 4.2969-9.6016 9.5977zm9.6016-5.6016v0.003906c2.2656 0 4.3086 1.3633 5.1719 3.457 0.86719 2.0898 0.39062 4.5-1.2109 6.1016-1.6016 1.6016-4.0117 2.082-6.1055 1.2148-2.0898-0.86719-3.457-2.9102-3.457-5.1758 0-1.5 0.60547-2.9414 1.6758-3.9922 1.0742-1.0547 2.5234-1.6328 4.0273-1.6055z" />
            <path d="m56.301 70.102c0 1.1016 0.89453 2 2 2s2-0.89844 2-2c0-8.0625-3.2031-15.797-8.9062-21.496-5.6992-5.7031-13.434-8.9062-21.496-8.9062-1.1016 0-2 0.89453-2 2s0.89844 2 2 2c7.0039 0 13.719 2.7812 18.668 7.7344 4.9531 4.9492 7.7344 11.664 7.7344 18.668z" />
            <path d="m77.102 70.102c0-12.52-4.9727-24.523-13.824-33.379-8.8555-8.8516-20.859-13.824-33.379-13.824-1.1016 0-2 0.89844-2 2 0 1.1055 0.89844 2 2 2 11.457 0 22.445 4.5547 30.547 12.656 8.1016 8.1016 12.656 19.09 12.656 30.547 0 1.1016 0.89453 2 2 2 1.1016 0 2-0.89844 2-2z" />
          </g>
        </svg>

        <h3 className="mt-2 text-sm font-medium text-gray-200">No feeds</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by adding a feed.
        </p>
        <div className="mt-6">
          <Button
            variant={Variants.PRIMARY}
            onClick={() => router.push('/websites?website=new')}
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New feed
          </Button>
        </div>
      </div>
    </div>
  );
};
