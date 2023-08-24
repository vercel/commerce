import ProductView from '@/components/product/product-view';
export type ProductPageParams = {
  data: object | any;
};

export default function ProductPage({ data }: ProductPageParams) {
  const product = data;

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
      <ProductView product={product} relatedProducts={[]} />
    </>
  );
}
