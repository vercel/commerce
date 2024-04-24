import { getCollectionProducts } from 'lib/shopify';
import { getAllLiveProducts } from 'lib/utils';
import Link from 'next/link';
import { GridTileImage } from '../grid/tile';

type Collection = 'flower' | 'foliage' | 'nature' | 'urban' | 'sky';

export async function Carousel({collection}: 
  {
    collection: Collection | undefined
}) {
  // Collections that start with `hidden-*` are hidden from the search page.
  const scapeTitle = collection ? `${collection[0]?.toUpperCase()}${collection.slice(1)}scapes` : '';
  
  const getProducts = async () => {
    return !!collection ? getCollectionProducts({ collection: scapeTitle }) : getAllLiveProducts();
  };
  const products = await getProducts();

  if (!products?.length) return null;

  return (
    <div>
      {scapeTitle && 
        <Link href={`/search/${scapeTitle}`}>
          <p className='text-lg text-bold'>{scapeTitle}</p>
        </Link>
      }
      {!scapeTitle && 
        // <Link href={`/search/${scapeTitle}`}>
          <p className='text-lg text-bold'>All Scapes</p>
        // </Link>
      }
      <div className=" w-full overflow-x-auto pb-6 pt-1 border-neutral-300 border-bottom:not-last-of-type">
        <div className="flex animate-carousel gap-4">
          {[...products, ...products].map((product, i) => (
            <Link
              key={`${product.handle}${i}`}
              href={`/products/${product.handle}`}
              className="h-50 w-1/3 sm-w-1/2 flex-none"
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
    </div>
  );
}
