'use client';
import React from 'react';
import { Button as ButtonBase, ButtonProps as ButtonBaseProps } from '@headlessui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import clsx from 'clsx';
import Spinner from './spinner';

const buttonVariants = tv({
  slots: {
    root: [
      // base
      'relative inline-flex items-center justify-center rounded-md',
      // text
      'text-center font-medium',
      // transition
      'transition-all duration-100 ease-in-out',
      // disabled
      'disabled:pointer-events-none disabled:shadow-none'
    ],
    loading: 'pointer-events-none flex shrink-0 items-center justify-center gap-1.5'
  },
  variants: {
    size: {
      sm: {
        root: 'text-xs px-2.5 py-1.5'
      },
      md: {
        root: 'text-sm px-3 py-2'
      },
      lg: {
        root: 'text-base px-4 py-2.5'
      }
    },
    variant: {
      primary: {
        root: [
          // border
          'border-transparent',
          // text color
          'text-white',
          // background color
          'bg-primary',
          // hover color
          'hover:bg-primary-empahsis',
          // disabled
          'disabled:bg-primary-muted'
        ]
      },
      secondary: {
        root: [
          // border
          'border-gray-300',
          // text color
          'text-gray-900',
          // background color
          ' bg-white',
          //hover color
          'hover:bg-gray-50',
          // disabled
          'disabled:text-gray-400'
        ]
      },
      text: {
        root: [
          // border
          'border-transparent',
          // text color
          'text-tremor-brand',
          // background color
          'bg-transparent',
          // hover color
          'disabled:text-gray-400'
        ]
      }
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});

interface ButtonProps extends ButtonBaseProps, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading,
      loadingText = 'Loading',
      size,
      variant,
      ...props
    }: ButtonProps,
    forwardedRef
  ) => {
    const { loading, root } = buttonVariants({ variant, size });
    return (
      <ButtonBase
        ref={forwardedRef}
        className={clsx(root(), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className={loading()}>
            <Spinner />
            <span className="sr-only">{loadingText}</span>
            <span>{loadingText}</span>
          </span>
        ) : (
          children
        )}
      </ButtonBase>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants, type ButtonProps };
