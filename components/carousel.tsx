import { getCollectionProducts } from 'lib/shopware';
import { isSeoUrls } from 'lib/shopware/helpers';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  const collectionName = isSeoUrls()
    ? 'Summer-BBQ/Hidden-Carousel-Category'
    : 'ff7bf3c59f1342a685844fbf8fdf9dc8';
  const { products } = await getCollectionProducts({
    collection: collectionName
  });

  if (!products?.length) return null;

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <div className="flex animate-carousel gap-4">
        {[...products, ...products].map((product, i) => (
          <Link
            key={`${product.path}${i}`}
            href={`/product/${product.path}`}
            className="h-[30vh] w-2/3 flex-none md:w-1/3"
          >
            <GridTileImage
              alt={product.title}
              label={{
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
    </div>
  );
}
