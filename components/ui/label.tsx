import { VariantProps, tv } from 'tailwind-variants';

const label = tv(
  {
    base: 'text-content',
    variants: {
      size: {
        sm: 'text-label-sm',
        md: 'text-label-md',
        lg: 'text-label-lg'
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

export interface LabelProps extends VariantProps<typeof label> {
  className?: string;
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

export default function Label({ children, className, size, as }: LabelProps) {
  const Component = as || 'span';

  return <Component className={label({ size, className })}>{children}</Component>;
}
