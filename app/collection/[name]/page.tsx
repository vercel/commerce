import { ThreeItemGridItem } from 'components/grid/three-items';
import { Product } from 'lib/woocomerce/models/product';
import { woocommerce } from 'lib/woocomerce/woocommerce';

export default async function ProductPage(props: { params: Promise<{ name: string }> }) {
  const params = await props.params;
  const products: Product[] = await woocommerce.get('products', { category: params.name });

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      {products.map((product, index) => (
        <ThreeItemGridItem key={product.id} size={index === 0 ? 'full' : 'half'} item={product} />
      ))}
    </section>
  );
}
