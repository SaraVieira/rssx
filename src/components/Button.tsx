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
  loading,
  ...props
}: {
  children: React.ReactNode;
  variant?: Variants;
  loading?: boolean;
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
      disabled={props.disabled || loading}
    >
      {children}
      {loading && (
        <svg
          version="1.1"
          id="L9"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 0 0"
          width={24}
          height={24}
        >
          <path
            fill="#fff"
            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      )}
    </button>
  );
};
