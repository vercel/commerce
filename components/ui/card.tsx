import React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { VariantProps, tv } from 'tailwind-variants';

const cardStyles = tv({
  base: 'rounded p-6 text-left w-full',
  variants: {
    outlined: {
      true: 'border bg-white',
      false: ''
    },
    elevated: {
      true: 'shadow-lg bg-white',
      false: ''
    }
  },
  defaultVariants: {
    outlined: true,
    elevated: false
  }
});

export interface CardProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof cardStyles> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, outlined, elevated, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : 'div';

    return (
      <Component
        ref={forwardedRef}
        className={cardStyles({ outlined, elevated, className })}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export default Card;
