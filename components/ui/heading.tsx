import { VariantProps, tv } from 'tailwind-variants';

const heading = tv(
  {
    base: [''],
    variants: {
      size: {
        sm: 'text-heading-sm',
        md: 'text-heading-md',
        lg: 'text-heading-lg'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  },
  {
    twMerge: false
  }
);

export interface HeadingProps extends VariantProps<typeof heading> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export default function Heading({ children, className, size, as }: HeadingProps) {
  const Component = as || 'span';
  return <Component className={heading({ size, className })}>{children}</Component>;
}
