import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="group relative flex h-11 w-11 items-center justify-center">
      <ShoppingBagIcon
        className={clsx(
          'h-10 stroke-current transition-all ease-in-out group-hover:scale-110',
          className
        )}
        strokeWidth={0.7}
      />

      {quantity ? (
        <div className="absolute right-[23%] top-[85%] -mr-2 -mt-2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform text-[12px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
