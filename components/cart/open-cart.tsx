import { cn } from '@/lib/utils';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center text-high-contrast lg:h-11 lg:w-11">
      <ShoppingBagIcon
        className={cn('h-5 stroke-current transition-all ease-in-out hover:scale-110 ', className)}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-high-contrast text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
