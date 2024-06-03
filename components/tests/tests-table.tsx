import Link from 'next/link';

export default function TestsTable({ products = [] }) {
  return (
    <div>
      <table>
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
              <td>Urine</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
