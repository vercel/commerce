import spree from '@commerce/index';
import Alphabet from 'components/tests/alphabet';
import TestsTable from 'components/tests/tests-table';

async function getProducts() {
  const res = await spree.products.list({});

  if (!res.isSuccess()) {
    throw new Error('Failed to fetch data');
  }

  return res.success().data;
}

export default async function TestsPage() {
  const products = await getProducts();

  return (
    <div>
      <Alphabet />
      <TestsTable products={products} />
    </div>
  );
}
