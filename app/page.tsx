export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};
import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import { Category } from 'lib/woocomerce/models/base';
import { Product } from 'lib/woocomerce/models/product';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import { wordpress } from 'lib/wordpress/wordpress';
import React from 'react';

export default async function HomePage() {
  const categories: Category[] = await woocommerce.get('products/categories');
  const productsByCategory: Record<string, Product[]> = {};
  await Promise.all(
    categories.map((category) =>
      woocommerce.get('products', { category: category.id.toString() }).then((products) => {
        productsByCategory[category.name] = products;
      })
    )
  );
  const posts = await wordpress.get('posts');

  return (
    <section>
      {categories.map((category, index) => (
        <div key={category.id} className={index % 2 === 0 ? 'bg-blue-600 py-4' : 'bg-white py-4'}>
          <div className="mb-2 mt-6 flex items-center justify-between px-4">
            <span className={`${index % 2 === 0 ? 'text-white' : 'text-black'} text-2xl font-bold`}>
              {category.name}
            </span>
          </div>
          <div className="mb-6 px-4">
            <span className={`${index % 2 === 0 ? 'text-white' : 'text-black'}`}>
              {category.description}
            </span>
          </div>
          <React.Fragment key={category.id}>
            {productsByCategory[category.name] && (
              <ThreeItemGrid products={productsByCategory[category.name] ?? []} />
            )}
          </React.Fragment>
          {index === 1 && (
            <div className="my-6 flex flex-col px-4">
              <span className="mb-2 text-2xl font-bold">Top products</span>
              <Carousel />
            </div>
          )}
        </div>
      ))}
      <div className="my-6 flex flex-col px-4">
        <span className="mb-2 text-2xl font-bold">Latest posts</span>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <div
              key={post.id + '-post'}
              className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black"
            >
              <img
                src={post.featured_image}
                alt={post.title.rendered}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{post.title.rendered}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
