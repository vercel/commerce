import commerceApi from '@commerce/api';
import Alphabet from 'components/tests/alphabet';
import TestsTable from 'components/tests/tests-table';

export default async function TestsPage() {
  const products = await commerceApi.getProducts();

  return (
    <div>
      <Alphabet />
      <TestsTable products={products} />
    </div>
  );
}
