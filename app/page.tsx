export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};
import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import ProductSuspense from 'components/product/product-suspense';
import { Category } from 'lib/woocomerce/models/base';
import { Product } from 'lib/woocomerce/models/product';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import { wordpress } from 'lib/wordpress/wordpress';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Bg1 from '../assets/images/slide-bg-01.webp';
import Bg2 from '../assets/images/slide-bg-02.webp';

async function Products({ category }: { category: Category }) {
  const products: Product[] = await woocommerce.get('products', {
    category: category.id.toString(),
    author: 1, // Use admin user to get all products
  });

  return <ThreeItemGrid products={products} />;
}

async function ProductsByCategory() {
  const categories: Category[] = await woocommerce.get('products/categories');
  const t = await getTranslations('HomePage');

  return (
    <>
      <div className="relative">
        <Image alt="" src={Bg1} className="mb-4 h-[640px] w-full object-cover" />
        <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black/60 to-transparent" />
        <Link
          href={''}
          className="absolute bottom-[10vh] right-20 text-2xl font-bold text-white underline"
        >
          {t('helpIA')}
        </Link>
      </div>
      {categories.map((category, index) => (
        <div key={category.id} className="my-8 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-2xl font-bold">{category.name}</span>
            <Link href={`/collection/${category.slug}`} className="pe-2 hover:text-indigo-500">
              {t('viewAll')}
            </Link>
          </div>
          <Suspense
            fallback={
              <div className="mx-auto grid max-w-screen-2xl gap-6 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
                {[...Array(3)].map((_, i) => (
                  <ProductSuspense key={i} />
                ))}
              </div>
            }
          >
            <Products category={category} />
          </Suspense>
          {index === 1 && (
            <>
              <div className="-mx-4">
                <Image alt="" src={Bg2} className="my-4 h-[540px] w-full object-cover" />
              </div>
              <div className="my-6 flex flex-col px-4">
                <span className="mb-2 text-2xl font-bold">{t('topProducts')}</span>
                <Carousel />
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
}

async function LatestPosts() {
  const posts = await wordpress.get('posts?_embed');
  const t = await getTranslations('HomePage');

  return (
    <div className="my-6 flex flex-col px-4">
      <span className="mb-2 text-2xl font-bold">{t('latestPosts')}</span>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <div
            key={post.id + '-post'}
            className="flex flex-col rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black"
          >
            <img
              src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url}
              alt={post.title.rendered}
              className="h-48 w-full object-cover"
            />
            <Link href={`/article/${post.id}`} className="p-4">
              <h2 className="text-xl font-bold">{post.title.rendered}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  return (
    <section>
      <Suspense
        fallback={
          <div className="mx-auto grid max-w-screen-2xl gap-6 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
            {[...Array(3)].map((_, i) => (
              <ProductSuspense key={i} />
            ))}
          </div>
        }
      >
        <ProductsByCategory />
      </Suspense>
      <Suspense
        fallback={
          <div className="mx-auto grid max-w-screen-2xl gap-6 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
            {[...Array(3)].map((_, i) => (
              <ProductSuspense key={i} />
            ))}
          </div>
        }
      >
        <LatestPosts />
      </Suspense>
    </section>
  );
}
