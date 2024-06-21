import { VariantProps, tv } from 'tailwind-variants';

const text = tv(
  {
    base: '',
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-md'
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

interface TextProps extends VariantProps<typeof text> {
  className?: string;
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

export default function Text({ children, className, size, as }: TextProps) {
  const Component = as || 'p';

  return <Component className={text({ size, className })}>{children}</Component>;
}
