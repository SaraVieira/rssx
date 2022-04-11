import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

export enum Variants {
  PRIMARY,
  SECONDARY,
  DANGER,
}
const variants = {
  [Variants.PRIMARY]:
    'border-cyan-300 bg-cyan-400 text-rssx-bg hover:bg-cyan-300',
  [Variants.DANGER]: 'border-red-500 bg-red-700 text-gray-200 hover:bg-red-500',
  [Variants.SECONDARY]:
    'border-rssx-border bg-rssx-bg text-gray-200 hover:bg-rssx-border ',
};

export const Button = ({
  children,
  variant = Variants.SECONDARY,
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={classNames(
        'relative justify-center inline-flex items-center px-4 py-2 rounded-md border  text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 disabled:opacity-60 disabled:pointer-events-none',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
