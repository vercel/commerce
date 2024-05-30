'use client';

import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import { useGlobalTransition } from 'lib/transition';
import Link from 'next/link';

function Loading() {
  return (
    <>
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return (
            <Grid.Item
              key={index}
              className="h-full w-full animate-pulse bg-neutral-100 dark:bg-neutral-800"
            />
          );
        })}
    </>
  );
}

export default function ProductGridItems({ products }: { products: Product[] }) {
  const { isPending } = useGlobalTransition();

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
