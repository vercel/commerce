import { ArrowRightIcon, PhotoIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Price from 'components/price';
import Image from 'next/image';
import Link from 'next/link';

export function GridTileImage({
  active,
  label,
  href,
  place = 'grid',
  ...props
}: {
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
  };
  place?: 'grid' | 'gallery';
  href: string;
} & React.ComponentProps<typeof Image>) {
  return (
    <div className="flex h-full flex-col rounded-b border bg-white">
      <div className="grow">
        <div className="px-4">
          <div
            className={clsx('aspect-h-1 aspect-w-1 relative overflow-hidden', {
              'border-2 border-secondary': active,
              'border-neutral-200': !active
            })}
          >
            {props.src ? (
              // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
              <Image className={clsx('h-full w-full object-cover object-center')} {...props} />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center text-gray-400"
                title="Missing product image"
              >
                <PhotoIcon className="size-7" />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 divide-y px-4">
          {label && (
            <h3 className="mt-4 text-sm font-semibold leading-6 text-gray-800">{label.title}</h3>
          )}
          {label && (
            <div className="flex w-full justify-end py-2">
              <Price
                className="text-lg font-medium text-gray-900"
                amount={label.amount}
                currencyCode={label.currencyCode}
              />
            </div>
          )}
        </div>
      </div>
      {place === 'grid' && (
        <Link
          href={href}
          className="flex items-center justify-center gap-3 rounded-b bg-dark py-3 text-white"
        >
          <span className="text-sm font-medium tracking-wide">More details</span>
          <ArrowRightIcon className="size-4" />
        </Link>
      )}
    </div>
  );
}

export const TileImage = ({
  active,
  ...props
}: {
  active?: boolean;
} & React.ComponentProps<typeof Image>) => {
  return (
    <div
      className={clsx('aspect-h-1 aspect-w-1 relative overflow-hidden rounded border bg-white', {
        'border-2 border-secondary': active,
        'border-neutral-200': !active
      })}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image className={clsx('h-full w-full object-cover object-center')} {...props} />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-gray-400"
          title="Missing product image"
        >
          <PhotoIcon className="size-7" />
        </div>
      )}
    </div>
  );
};
