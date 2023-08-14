import clsx from 'clsx';
import { Locale } from 'i18n-config';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import Label from '../label';
import { GridTileImage } from './tile';

function ThreeItemGridItem({ item, priority }: { item: Product; priority?: boolean }) {
  const size = item?.variants?.[0]?.selectedOptions?.find((option) => option.name === 'Size');
  return (
    <div className={clsx('col-span-1 row-span-1 md:col-span-2 md:row-span-1')}>
      <Link
        className="relative block aspect-tall w-full overflow-hidden bg-black/30"
        href={`/product/${item.handle}`}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={'(min-width: 768px) 33vw, 100vw'}
          priority={priority}
          alt={item.title}
        />
      </Link>
      <div className="font-multilingual max-w-sm pt-4">
        <Label
          title={item.title as string}
          amount={item.priceRange.maxVariantPrice.amount}
          currencyCode={item.priceRange.maxVariantPrice.currencyCode}
          size={size?.value}
        />
        <div className="font-regular line-clamp-4 pt-2">{item?.summary?.value}</div>
      </div>
    </div>
  );
}

export async function ThreeItemGrid({ lang }: { lang: Locale }) {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items',
    language: lang.toUpperCase()
  });

  console.debug({ homepageItems });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section
      className={clsx(
        'mx-auto grid max-w-screen-2xl gap-6 px-4 pb-4 ',
        'grid-cols-1 md:grid-cols-6',
        'grid-rows-3 md:grid-rows-1'
      )}
    >
      <ThreeItemGridItem item={firstProduct} priority={true} />
      <ThreeItemGridItem item={secondProduct} priority={true} />
      <ThreeItemGridItem item={thirdProduct} />
    </section>
  );
}
