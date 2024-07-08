import { VariantProps, tv } from 'tailwind-variants';

const text = tv(
  {
    base: '',
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-md'
      },
      bold: {
        true: 'font-medium'
      }
    },
    defaultVariants: {
      size: 'md',
      bold: false
    }
  },
  {
    twMerge: false
  }
);

export interface TextProps extends VariantProps<typeof text> {
  className?: string;
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

export default function Text({ children, className, size, as, bold }: TextProps) {
  const Component = as || 'p';

  return <Component className={text({ size, bold, className })}>{children}</Component>;
}
