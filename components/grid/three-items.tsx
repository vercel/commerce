import clsx from 'clsx';
import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({ item, priority }: { item: Product; priority?: boolean }) {
  return (
    <div className={clsx('md:col-span-2 md:row-span-1')}>
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={'(min-width: 768px) 33vw, 100vw'}
          priority={priority}
          alt={item.title}
          label={{
            position: 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section
      className={clsx(
        'mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6',
        'md:grid-rows-3'
      )}
    >
      <ThreeItemGridItem item={firstProduct} priority={true} />
      <ThreeItemGridItem item={secondProduct} priority={true} />
      <ThreeItemGridItem item={thirdProduct} />
    </section>
  );
}
