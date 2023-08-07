'use client';

import Price from 'components/product/price';
import Text from 'components/ui/text';
import type { Product } from 'lib/storm/types/product';
import { cn } from 'lib/utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC } from 'react';

const WishlistButton = dynamic(() => import('components/ui/wishlist-button'));

const SanityImage = dynamic(() => import('components/ui/sanity-image'));

interface Props {
  className?: string;
  product: Product;
  variant?: 'default';
}

const ProductCard: FC<Props> = ({ product, className, variant = 'default' }) => {
  const rootClassName = cn('w-full group relative overflow-hidden', className);

  return (
    <Link
      href={`/product/${product.slug}`}
      className={rootClassName}
      aria-label={product.name}
      locale={product.locale}
    >
      {variant === 'default' && (
        <div className={'relative flex h-full w-full flex-col justify-center'}>
          <WishlistButton
            className={'absolute right-4 top-4 z-10'}
            productId={product.id}
            variant={product?.variants ? (product.variants[0] as any) : null}
          />
          <div className="relative h-full w-full overflow-hidden">
            {product?.images && (
              <SanityImage
                image={product?.images[0]}
                alt={product.title || 'Product Image'}
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
            )}
          </div>

          <div className={cn('flex flex-col items-start text-high-contrast', className)}>
            <Text className="mt-2 lg:mt-3" variant="listChildHeading">
              {product.title}
            </Text>
            <Price
              className="text-sm font-medium leading-tight lg:text-base"
              amount={`${product.price.value}`}
              currencyCode={product.price.currencyCode ? product.price.currencyCode : 'SEK'}
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
