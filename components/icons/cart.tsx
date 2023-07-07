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
    <div className="relative flex items-center justify-center text-black transition-colors border rounded-md h-11 w-11 border-light-gray-4 dark:border-dark-gray-4 dark:text-white">
      <ShoppingCartIcon
        className={clsx('h-6 transition-all ease-in-out hover:scale-110 ', className)}
      />
      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-vercel-blue text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
