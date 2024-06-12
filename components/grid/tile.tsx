import { ArrowRightIcon, PhotoIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

export function GridTileImage({
  active,
  product,
  href,
  ...props
}: {
  active?: boolean;
  product: Product;
  href: string;
} & React.ComponentProps<typeof Image>) {
  const metafieldKeys = ['engineCylinders', 'fuelType'] as Partial<keyof Product>[];
  const shouldShowDescription = metafieldKeys.some((key) => product[key]);

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
        <h3 className="mt-4 px-4 pb-2 text-sm font-semibold leading-6 text-gray-800">
          {product.title}
        </h3>
      </div>
      <div className="px-4">
        {shouldShowDescription && (
          <div className="flex items-center justify-center gap-x-7 border-t py-3">
            {product.engineCylinders?.length ? (
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/icons/cylinder.png"
                  alt="Cylinder icon"
                  width={16}
                  height={16}
                  className="size-4"
                  sizes="16px"
                />
                <span className="text-xs tracking-wide">{`${product.engineCylinders[0]} Cylinder`}</span>
              </div>
            ) : null}
            {product.fuelType ? (
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/icons/fuel.png"
                  alt="Fuel icon"
                  width={16}
                  height={16}
                  className="size-4"
                  sizes="16px"
                />
                <span className="text-xs tracking-wide">{product.fuelType}</span>
              </div>
            ) : null}
          </div>
        )}
        <div className="flex justify-end border-t py-2">
          <Price
            className="text-lg font-medium text-gray-900"
            amount={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
          />
        </div>
      </div>

      <Link
        href={href}
        className="flex items-center justify-center gap-3 rounded-b bg-dark py-3 text-white"
      >
        <span className="text-sm font-medium tracking-wide">More details</span>
        <ArrowRightIcon className="size-4" />
      </Link>
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
