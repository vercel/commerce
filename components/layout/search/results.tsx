import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default async function SearchResults({ products }: { products: Product[] }) {
  return (
    <>
      {products.length ? (
        <Grid className="grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Grid.Item key={product.handle} className="animate-fadeIn">
              <Link className="h-full w-full" href={`/product/${product.handle}`}>
                <GridTileImage
                  alt={product.title}
                  labels={{
                    isSmall: true,
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  src={product.featuredImage.url}
                  width={600}
                  height={600}
                />
              </Link>
            </Grid.Item>
          ))}
        </Grid>
      ) : null}
    </>
  );
}
