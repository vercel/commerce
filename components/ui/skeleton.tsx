import { VariantProps, tv } from 'tailwind-variants';

const skeleton = tv({
  base: 'animate-pulse rounded bg-gray-100 w-full h-6'
});

interface SkeletonProps extends VariantProps<typeof skeleton> {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return <div className={skeleton({ className })} />;
}
