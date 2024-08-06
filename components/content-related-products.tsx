import { Store } from 'lib/aspire/types';
import { getProductRecommendations } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function RelatedProducts({
  store,
  productId,
  currentPath
}: {
  store: Store;
  productId: string;
  currentPath: string;
}) {
  const relatedProducts = await getProductRecommendations(store, productId);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <ul className="no-scrollbar flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => {
          const pId = product.id.split('/').at(-1);
          return (
            <li
              key={product.handle}
              className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <Link className="relative h-full w-full" href={`${currentPath}/${pId}`}>
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
