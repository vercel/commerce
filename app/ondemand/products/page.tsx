import spreeClient from 'lib/spree';

export default async function Products() {
  const products = await (await spreeClient.products.list({})).success().data;

  console.log('FUCK', products);

  return (
    <div>
      {products.map((product) => (
        <div className="md:ml-auto" key={product.id}>
          {product.attributes.name}
        </div>
      ))}
    </div>
  );
}
