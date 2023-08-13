import clsx from 'clsx';
import { GridTileImage } from 'components/grid/tile';
import { Locale } from 'i18n-config';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import Label from '../label';

function ThreeItemGridItem({ item, priority }: { item: Product; priority?: boolean }) {
  return (
    <div className={clsx('md:col-span-2 md:row-span-1')}>
      <Link
        className="relative block aspect-bottle h-full w-full overflow-hidden bg-black/30"
        href={`/product/${item.handle}`}
      >
        <GridTileImage
          src={item.featuredImage.url}
          height={1690}
          width={1192}
          layout="responsive"
          // fill
          sizes={'(min-width: 768px) 33vw, 100vw'}
          priority={priority}
          alt={item.title}
        />
      </Link>
      <div className="pt-4">
        <Label
          title={item.title as string}
          amount={item.priceRange.maxVariantPrice.amount}
          currencyCode={item.priceRange.maxVariantPrice.currencyCode}
        />
        <div className="line-clamp-4">{item?.description}</div>
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
