import commerceApi from '@commerce/api';
import CartButton from 'components/tests/cart-button';
import { notFound } from 'next/navigation';

export default async function TestPage({ params }: { params: any }) {
  const { id } = params;
  const product = await commerceApi.getProduct(id);

  if (!product) return notFound();

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Test Detail for ID: {product.id}
      </h1>
      <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">{product.attributes.name}</p>
      <CartButton id={product.id} />
    </div>
  );
}
