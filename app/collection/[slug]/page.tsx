import { ProductCard } from 'components/product/product-card';
import { Product } from 'lib/woocomerce/models/product';
import { woocommerce } from 'lib/woocomerce/woocommerce';

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const slug = (await props.params).slug;
  const category = (await woocommerce.get('products/categories', { slug }))?.[0];
  const products: Product[] = await woocommerce.get('products', {
    category: category.id.toString()
  });

  return (
    <div>
      <div className="mb-2 mt-6 flex items-center justify-between px-4">
        <span className="text-2xl font-bold">{category.name}</span>
      </div>
      <div className="mb-6 px-4">
        <span>{category.description}</span>
      </div>
      <section className="mx-auto grid max-w-screen-2xl flex-col gap-6 px-4 pb-4 md:grid-cols-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
