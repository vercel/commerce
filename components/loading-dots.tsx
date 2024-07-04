import clsx from 'clsx';
import { VariantProps, tv } from 'tailwind-variants';

const loadingDots = tv({
  slots: {
    root: 'mx-2 inline-flex items-center',
    dots: 'bg-content inline-block animate-blink rounded-full'
  },
  variants: {
    size: {
      md: {
        dots: 'h-1 w-1 mx-[1px]'
      },
      lg: {
        dots: 'h-2 w-2 mx-[2px]'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

const LoadingDots = ({
  rootClassName,
  className,
  size
}: { className?: string; rootClassName?: string } & VariantProps<typeof loadingDots>) => {
  const { root, dots } = loadingDots({ size });
  return (
    <span className={root({ className: rootClassName })}>
      <span className={dots({ className })} />
      <span className={clsx(dots({ className }), 'animation-delay-[200ms]')} />
      <span className={clsx(dots({ className }), 'animation-delay-[400ms]')} />
    </span>
  );
};

export default LoadingDots;
