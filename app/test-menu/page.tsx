import marketApi from '@market/api';
import Alphabet from 'components/tests/alphabet';
import TestsTable from 'components/tests/tests-table';

export default async function TestsPage() {
  const products = await marketApi.getProducts();

  return (
    <div>
      <Alphabet />
      <TestsTable products={products} />
    </div>
  );
}
