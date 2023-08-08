import clsx from 'clsx';
import ShoppingBagIcon from 'components/icons/shopping-bag';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-ui-border text-high-contrast transition-colors">
      <ShoppingBagIcon
        className={clsx(
          'h-4 stroke-current transition-all ease-in-out hover:scale-110 ',
          className
        )}
      />

      {quantity ? (
        <div className="bg-blue-600 absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
