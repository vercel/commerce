import { GridTileImage } from 'components/grid/tile';
import { ProductCard } from 'components/product/product-card';
import { Product } from 'lib/woocomerce/models/product';
import Link from 'next/link';

export function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.slug}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.images?.[0]?.src || ''}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name as string,
            amount: item.price,
            currencyCode: 'EUR'
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto grid gap-4 px-4 pb-4 md:grid-cols-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
