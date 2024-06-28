'use client';
import React from 'react';
import { Button as ButtonBase, ButtonProps as ButtonBaseProps } from '@headlessui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import clsx from 'clsx';
import LoadingDots from './loading-dots';
import { focusInput } from 'lib/utils';

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
      'disabled:pointer-events-none disabled:shadow-none',
      'shadow-sm',
      focusInput
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
      solid: {
        root: 'border border-transparent'
      },
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
          // text color
          'text-white',
          // background color
          'bg-primary',
          // hover color
          'hover:bg-primary-emphasis',
          // disabled
          'disabled:bg-primary-muted',
          'pressed:bg-primary-emphasis/80'
        ]
      }
    },
    {
      color: 'content',
      variant: 'solid',
      class: {
        root: [
          // text color
          'text-white',
          // background color
          'bg-content',
          // hover color
          'hover:bg-content-emphasis',
          // disabled
          'disabled:bg-content-muted',
          'pressed:bg-content-emphasis/80'
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
          'hover:bg-primary/5',
          // disabled
          'disabled:border-primary-muted disabled:text-primary-muted'
        ]
      }
    },
    {
      color: 'content',
      variant: 'outlined',
      class: {
        root: [
          // border
          'border-content-subtle',
          // text color
          'text-content-emphasis',
          // background color
          'bg-white',
          // hover color
          'hover:bg-content/5',
          // disabled
          'disabled:border-content-muted disabled:text-content-muted'
        ]
      }
    }
  ],
  defaultVariants: {
    variant: 'outlined',
    color: 'content',
    size: 'md'
  }
});

export interface ButtonProps
  extends Omit<ButtonBaseProps, 'color' | 'as'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  as?: React.ElementType;
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
      color,
      variant,
      as,
      ...props
    }: ButtonProps,
    forwardedRef
  ) => {
    const { loading, root } = buttonVariants({ variant, size, color });

    const Component = as || 'button';
    return (
      <ButtonBase
        as={Component}
        ref={forwardedRef}
        className={clsx(root(), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className={loading()}>
            <LoadingDots />
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

export default Button;
