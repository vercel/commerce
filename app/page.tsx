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
import Link from 'next/link';
import { Suspense } from 'react';

async function Products({ category }: { category: Category }) {
  const products: Product[] = await woocommerce.get('products', {
    category: category.id.toString()
  });

  return <ThreeItemGrid products={products} />;
}

async function ProductsByCategory() {
  const categories: Category[] = await woocommerce.get('products/categories');

  return (
    <>
      {categories.map((category, index) => (
        <div key={category.id}>
          <div className="mb-2 mt-6 flex items-center justify-between px-4">
            <span className="text-2xl font-bold">{category.name}</span>
          </div>
          <Suspense
            fallback={
              <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
                {[...Array(3)].map((_, i) => (
                  <ProductSuspense key={i} />
                ))}
              </div>
            }
          >
            <Products category={category} />
          </Suspense>
          {index === 1 && (
            <div className="my-6 flex flex-col px-4">
              <span className="mb-2 text-2xl font-bold">Top products</span>
              <Carousel />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

async function LatestPosts() {
  const posts = await wordpress.get('posts?_embed');

  return (
    <div className="my-6 flex flex-col px-4">
      <span className="mb-2 text-2xl font-bold">Latest posts</span>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
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
          <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
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
