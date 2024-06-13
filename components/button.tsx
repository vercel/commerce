import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';
import clsx from 'clsx';

const buttonVariants = tv({
  base: [
    // base
    'relative inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-center text-sm font-medium transition-all duration-100 ease-in-out',
    // disabled
    'disabled:pointer-events-none disabled:shadow-none'
  ],
  variants: {
    size: {
      sm: 'text-xs px-2.5 py-1.5',
      md: 'text-sm px-3 py-2',
      lg: 'text-base px-4 py-2.5'
    },
    variant: {
      primary: [
        // border
        'border-transparent',
        // text color
        'text-white',
        // background color
        'bg-tremor-brand',
        // hover color
        'hover:bg-tremor-brand-emphasis',
        // disabled
        'disabled:bg-gray-100',
        'disabled:bg-tremor-brand-muted'
      ],
      secondary: [
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
      ],
      text: [
        // border
        'border-transparent',
        // text color
        'text-tremor-brand',
        // background color
        'bg-transparent',
        // hover color
        'disabled:text-gray-400'
      ],
      destructive: [
        // text color
        'text-white',
        // border
        'border-transparent',
        // background color
        'bg-red-600',
        // hover color
        'hover:bg-red-700',
        // disabled
        'disabled:bg-red-300 disabled:text-white'
      ]
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      className,
      disabled,
      variant,
      children,
      ...props
    }: ButtonProps,
    forwardedRef
  ) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        ref={forwardedRef}
        className={clsx(buttonVariants({ variant }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
            <span className="sr-only">{loadingText ? loadingText : 'Loading'}</span>
            {loadingText ? loadingText : children}
          </span>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants, type ButtonProps };
