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
    color: {
      primary: {},
      content: {}
    },
    variant: {
      solid: {},
      outlined: {
        root: 'border bg-white'
      },
      text: {}
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'solid',
      class: {
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
          'disabled:bg-primary-muted',
          'pressed:bg-primary-emphasis/80'
        ]
      }
    },
    {
      color: 'primary',
      variant: 'outlined',
      class: {
        root: [
          // border
          'border-primary',
          // text color
          'text-primary',
          // background color
          'bg-white',
          // hover color
          'hover:bg-primary/10',
          // disabled
          'disabled:border-primary-muted disabled:text-primary-muted'
        ]
      }
    }
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md'
  }
});

interface ButtonProps extends Omit<ButtonBaseProps, 'color'>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
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
