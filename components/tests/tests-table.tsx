import { ProductAttr } from '@spree/storefront-api-v2-sdk/dist/*';
import Link from 'next/link';
import CartButton from './cart-button';

export default function TestsTable({ products }: { products: ProductAttr[] }) {
  return (
    <div>
      <table className="table w-full border-collapse border">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Specimen</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <Link href={`/tests/${product.id}`}>{product.attributes.name}</Link>
              </td>
              <td>
                <CartButton id={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
