import clsx from 'clsx';
import { SupportedLocale } from 'components/layout/navbar/language-control';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import Label from '../label';
import { GridTileImage } from './tile';

function ProductGridItem({ item, priority }: { item: Product; priority?: boolean }) {
  const size = item?.variants?.[0]?.selectedOptions?.find((option) => option.name === 'Size');

  return (
    <div className={clsx('col-span-1 row-span-1 md:col-span-2 md:row-span-1')}>
      <Link className="w-full bg-black/30" href={`/product/${item.handle}`}>
        <div className="relative block aspect-square overflow-hidden ">
          <GridTileImage
            src={item.featuredImage.url}
            fill
            sizes={'(min-width: 768px) 33vw, 100vw'}
            priority={priority}
            alt={item.title}
          />
        </div>
        <div className="font-multilingual max-w-sm pb-24 pt-4 md:pb-0">
          <Label
            title={item.title as string}
            amount={item.priceRange.maxVariantPrice.amount}
            currencyCode={item.priceRange.maxVariantPrice.currencyCode}
            size={size?.value}
          />
          <div className="line-clamp-4 pt-2 font-extralight">{item?.summary?.value}</div>
        </div>
      </Link>
    </div>
  );
}

export async function ProductGrid({ lang }: { lang?: SupportedLocale }) {
  // Collections that start with `hidden-*` are hidden from the search page.
  const productPageItems = await getCollectionProducts({
    collection: 'hidden-products-page-items',
    language: lang?.toUpperCase()
  });
  console.debug({ productPageItems });

  if (!productPageItems?.length) return null;

  return (
    <section
      className={clsx(
        'mx-auto grid max-w-screen-xl gap-6 px-4 pb-4 ',
        'grid-cols-1 md:grid-cols-6',
        'grid-rows-3 md:grid-rows-1'
      )}
    >
      {productPageItems.map((item) => (
        <ProductGridItem key={item.id} item={item} priority={true} />
      ))}
    </section>
  );
}
