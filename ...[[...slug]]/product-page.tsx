import ProductView from 'components/product/product-view';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  data: object | any;
}

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function ProductPage({ data }: ProductPageProps) {
  if (!data) {
    return notFound();
  }

  const { product } = data;

  return <ProductView product={product} relatedProducts={[]} />;
}
