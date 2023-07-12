import { getCollectionProducts } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
<<<<<<< HEAD
import Label from './label';
=======
import Price from './price';
>>>>>>> 27a839e (home page updated UI design)

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  return (
    <div className="relative w-full pb-6 overflow-hidden">
      <div className="flex space-x-4 animate-carousel">
        {[...products, ...products].map((product, i) => (
          <Link
            key={`${product.handle}${i}`}
            href={`/product/${product.handle}`}
            className="relative h-[30vh] w-2/3 flex-none rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-black md:w-1/3"
          >
            {product.featuredImage ? (
              <Image
                alt={product.title}
                className="object-contain h-full"
                fill
                sizes="33vw"
                src={product.featuredImage.url}
              />
            ) : null}
            <Label
              title={product.title}
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
