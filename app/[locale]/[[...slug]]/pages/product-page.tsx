import ProductView from '@/components/product/product-view';
import { clientFetch } from '@/lib/sanity/sanity.client';
import { notFound } from 'next/navigation';

interface ProductPageParams {
  query: string;
  queryParams: {
    slug: string;
    locale: string;
  };
}

export default async function ProductPage({ query, queryParams }: ProductPageParams) {
  const product = await clientFetch(query, queryParams);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0].asset.url
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <ProductView product={product} relatedProducts={[]} />;
    </>
  );
}
