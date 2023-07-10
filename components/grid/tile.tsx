import clsx from 'clsx';
import Image from 'next/image';

import Price from 'components/price';

export function GridTileImage({
  isInteractive = true,
  active,
  labelPosition,
  labels,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  labelPosition?: 'bottom' | 'center';
  labels?: {
    title: string;
    amount: string;
    currencyCode: string;
    isSmall?: boolean;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-black',
        {
          relative: labels
        }
      )}
    >
      {active !== undefined && active ? (
        <span className="absolute h-full w-full bg-white opacity-25"></span>
      ) : null}
      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out hover:scale-105': isInteractive
          })}
          {...props}
          alt={props.title || ''}
        />
      ) : null}
      {labels ? (
        <div
          className={clsx(
            'absolute bottom-0 left-0 flex items-center rounded-full border bg-white/80 p-1 text-black backdrop-blur-md dark:border-gray-800 dark:bg-black/80 dark:text-white',
            labelPosition === 'center'
              ? 'mb-2 ml-2 md:mb-8 md:ml-8 lg:mb-[35%] lg:ml-20'
              : 'mb-2 ml-2 md:mb-8 md:ml-8'
          )}
        >
          <h3
            data-testid="product-name"
            className={clsx(
              'mr-6 inline pl-2 font-semibold',
              !labels.isSmall ? 'text-sm' : 'text-sm'
            )}
          >
            {labels.title}
          </h3>
          <Price
            className="flex-none rounded-full bg-blue-600 p-2 text-sm font-semibold text-white"
            amount={labels.amount}
            currencyCode={labels.currencyCode}
          />
        </div>
      ) : null}
    </div>
  );
}
