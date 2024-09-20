import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/fourthwall';
import type { Product } from 'lib/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  currency,
  size,
  priority
}: {
  item: Product;
  currency: string;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}?currency=${currency}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid({currency}: { currency: string}) {
  const homepageItems = await getCollectionProducts({
    collection: process.env.NEXT_PUBLIC_FW_COLLECTION || '',
    currency,
  });


  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} currency={currency}/>
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} currency={currency}/>
      <ThreeItemGridItem size="half" item={thirdProduct} currency={currency}/>
    </section>
  );
}
