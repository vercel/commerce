import React from 'react';

import { VariantProps, tv } from 'tailwind-variants';

const badgeStyles = tv({
  base: [
    'absolute -right-2 -top-2 h-5 w-5',
    'flex items-center justify-center rounded-full text-xs font-semibold'
  ],
  variants: {
    color: {
      primary: 'bg-primary text-white',
      secondary: 'bg-secondary text-white',
      content: 'bg-content text-white'
    }
  },
  defaultVariants: {
    color: 'content'
  }
});

export interface BadgeProps extends VariantProps<typeof badgeStyles> {
  content: string | number;
  className?: string;
  children: React.ReactNode;
}

export default function Badge({ className, color, children, content }: BadgeProps) {
  return (
    <span className="relative flex-none">
      {children}
      <span className={badgeStyles({ color, className })}>{content}</span>
    </span>
  );
}
