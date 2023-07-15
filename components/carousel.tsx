import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  return (
    <div className="flex w-full gap-4 overflow-x-auto pb-6 pt-1">
      {[...products, ...products].map((product, i) => (
        <Link
          key={`${product.handle}${i}`}
          href={`/product/${product.handle}`}
          className="h-[30vh] w-2/3 flex-none md:w-1/3"
        >
          <GridTileImage
            alt={product.title}
            labels={{
              isSmall: true,
              title: product.title,
              amount: product.priceRange.maxVariantPrice.amount,
              currencyCode: product.priceRange.maxVariantPrice.currencyCode
            }}
            src={product.featuredImage?.url}
            width={600}
            height={600}
          />
        </Link>
      ))}
    </div>
  );
}
