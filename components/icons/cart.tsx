import clsx from 'clsx';
import ShoppingCartIcon from './shopping-cart';

export default function CartIcon({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-dark-gray-4 text-black transition-colors dark:text-gray-100">
      <ShoppingCartIcon
        className={clsx(
          'h-6 transition-all ease-in-out hover:scale-110 hover:text-gray-500 dark:hover:text-gray-300',
          className
        )}
      />
      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-500 text-[11px] font-medium">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
