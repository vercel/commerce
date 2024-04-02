import clsx from 'clsx';
import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

export function ShirtGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half' | 'third' | 'quarter';
  priority?: boolean;
}) {
  return (
    <div
      className={clsx('cursor-pointer', {
        'md:col-span-4 md:row-span-2': size === 'full',
        'md:col-span-1 md:row-span-1': size != 'full'
      })}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}>
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
          sparkles={true}
          available={item.availableForSale}
        />
        <div className="absolute -bottom-12 z-10 h-fit w-full select-none opacity-100 lg:hidden ">
          {item.title && (
            <h3 className="line-clamp-2 text-center text-4xl tracking-tight">{item.title}</h3>
          )}
        </div>
      </Link>
    </div>
  );
}

export async function HomepageShirts() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'shirts'
  });

  if (!homepageItems[0] || homepageItems.length <= 0) return null;

  const [firstProduct, secondProduct, thirdProduct, fourthProduct] = homepageItems;

  return (
    <>
      <section className="mx-auto max-w-screen-2xl justify-center pb-12">
        <div className="space-y-4 p-6 py-4 lg:p-12">
          <h3 className="text-center text-lg lg:text-2xl">
            Presenting the latest season of extra-large garments from Okay XL...
          </h3>
          <p className="text-center text-4xl lg:text-5xl">
            &ldquo; Fake Anime Shows Your Friends Have Never Heard Of &rdquo;
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-screen-2xl gap-4 gap-y-32 px-4 pb-24 md:grid-cols-3 md:grid-rows-2 md:gap-y-16">
        {homepageItems.map((product) => (
          <ShirtGridItem key={product.id} size="third" item={product} priority={true} />
        ))}
      </section>
      <section className="mx-auto max-w-screen-2xl justify-center p-6 py-4 lg:p-12">
        <h3 className="text-3xl lg:text-left lg:text-5xl">
          Okay XL only offers t-shirt sizes XL and up....
        </h3>
        <p className="max-w-3xl font-sans">
          I made the decision to exclusively stock sizes XL & up because, I can.
        </p>
        <p className="max-w-3xl font-sans">
          You won't find any t-shirts listed for sale on this site smaller than XL but, if you want
          to request a smaller size{' '}
          <Link className="cursor-pointer underline" href={'/small-sizes'}>
            you can find more information here.
          </Link>
        </p>
      </section>
    </>
  );
}
