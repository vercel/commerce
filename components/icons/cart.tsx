import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import CloseIcon from './close';

export default function CartIcon({
  className,
  quantity,
  icon
}: {
  className?: string;
  quantity?: number;
  icon?: string;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      {icon === 'close' ? (
        <CloseIcon className={clsx('h-6 transition-all ease-in-out hover:scale-110 ', className)} />
      ) : (
        <ShoppingCartIcon
          className={clsx('h-4 transition-all ease-in-out hover:scale-110 ', className)}
        />
      )}

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
