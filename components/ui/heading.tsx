import { VariantProps, tv } from 'tailwind-variants';

const heading = tv({
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
});

interface HeadingProps extends VariantProps<typeof heading> {
  className?: string;
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

export default function Heading({ children, className, size, as }: HeadingProps) {
  const Component = as || 'h2';
  return <Component className={heading({ size, className })}>{children}</Component>;
}
