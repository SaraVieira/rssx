import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

export const Input = ({
  className,
  label,
  name,
  ...rest
}: {
  className?: string;
  label: string;
  name: string;
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>) => (
  <div className="my-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-200">
      {label}
    </label>
    <div className="mt-1">
      <input
        type={rest.type || 'text'}
        name={name}
        id={name}
        className={classNames(
          'shadow-sm focus:ring-indigo-700 focus:border-indigo-700 block w-full sm:text-sm border-rssx-border rounded-md bg-rssx-bg text-white placeholder:text-gray-400',
          className,
        )}
        {...rest}
      />
    </div>
  </div>
);
