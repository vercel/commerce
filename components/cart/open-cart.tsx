import clsx from 'clsx';
import { ShoppingBagIcon } from 'lucide-react';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    // <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-700 text-white transition-colors dark:border-neutral-700 dark:text-white">
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors dark:text-white">
      <ShoppingBagIcon
        className={clsx('h-6 transition-all ease-in-out hover:scale-110', className)}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-neutral-800 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
