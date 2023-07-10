import { getCollectionProducts } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import Price from './price';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  return (
    <div className="relative w-full overflow-hidden pb-6">
      <div className="flex animate-carousel space-x-6">
        {[...products, ...products].map((product, i) => (
          <Link
            key={`${product.handle}${i}`}
            href={`/product/${product.handle}`}
            className="relative h-[30vh] w-2/3 flex-none rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-black md:w-1/3"
          >
            {product.featuredImage ? (
              <Image
                alt={product.title}
                className="h-full object-contain"
                fill
                sizes="33vw"
                src={product.featuredImage.url}
              />
            ) : null}
            <div className="absolute bottom-0 left-0 mb-2 ml-2 flex items-center rounded-full border bg-white/80 p-1 text-black backdrop-blur-md dark:border-gray-800 dark:bg-black/80 dark:text-white md:mb-8 md:ml-8">
              <h3 data-testid="product-name" className="mr-6 inline pl-2 text-xs font-semibold">
                {product.title}
              </h3>
              <Price
                className="flex-none rounded-full bg-blue-600 p-2 text-xs font-semibold text-white"
                amount={product.priceRange.maxVariantPrice.amount}
                currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
