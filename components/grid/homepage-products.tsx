import { ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { InlineAddToCart } from 'components/cart/inline-add-to-cart';
import { SupportedLocale } from 'components/layout/navbar/language-control';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import Label from '../label';
import { GridTileImage } from './tile';

export const runtime = 'edge';
export const revalidate = 300; // 5 minutes in seconds

function HomepageProductsItem({ item, priority }: { item: Product; priority?: boolean }) {
  const size = item?.variants?.[0]?.selectedOptions?.find((option) => option.name === 'Size');
  const image = item?.variants?.[0]?.image;

  return !!image ? (
    <div
      className={clsx(
        'col-span-1 row-span-1 flex flex-col justify-between space-y-6 md:col-span-2 md:row-span-1'
      )}
    >
      <Link className="group block w-full" href={`/product/${item.handle}`}>
        <span className="relative block aspect-tall overflow-hidden">
          <GridTileImage
            src={image?.url}
            fill
            sizes={'(min-width: 768px) 33vw, 100vw'}
            priority={priority}
            alt={item.title}
          />
        </span>
        <span className="font-multilingual block max-w-sm pb-24 pt-4 md:pb-0">
          <Label
            title={item.title as string}
            amount={item.priceRange.maxVariantPrice.amount}
            currencyCode={item.priceRange.maxVariantPrice.currencyCode}
            size={size?.value}
          />
          <span className="line-clamp-4 pt-2 font-extralight">
            <span>{item?.summary?.value}</span>{' '}
            <span className="ml-2 inline-flex flex-row items-center space-x-1 opacity-50 transition-opacity duration-150 group-hover:opacity-100">
              <span>read more.</span>
              <span>
                <ChevronRightIcon width={16} />
              </span>
            </span>
          </span>
        </span>
      </Link>
      <InlineAddToCart variants={item.variants} availableForSale={item.availableForSale} />
    </div>
  ) : null;
}

export async function HomepageProducts({ lang }: { lang?: SupportedLocale }) {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items',
    language: lang?.toUpperCase()
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section
      className={clsx(
        'mx-auto grid max-w-screen-xl gap-12 px-4 pb-4 ',
        'grid-cols-1 md:grid-cols-6',
        'grid-rows-3 md:grid-rows-1'
      )}
    >
      <HomepageProductsItem item={firstProduct} priority={true} />
      <HomepageProductsItem item={secondProduct} priority={true} />
      <HomepageProductsItem item={thirdProduct} />
    </section>
  );
}
