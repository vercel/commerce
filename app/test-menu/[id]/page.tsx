import marketApi from '@market/api';
import CartButton from 'components/tests/cart-button';
import { notFound } from 'next/navigation';

export default async function TestPage({ params }: { params: any }) {
  const { id } = params;
  const product = await marketApi.getProduct(id);

  if (!product) return notFound();

  return (
    <div>
      <h1>Test Detail for ID: {product.id}</h1>
      <p>{product.attributes.name}</p>
      <CartButton id={product.id} />
    </div>
  );
}
