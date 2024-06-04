import spree from '@commerce/index';
import DiseasesAndConditions from 'components/diseases/diseases-and-conditions';
import Specialities from 'components/diseases/specialities';
import { cache } from 'react';

const getTaxons = cache(async (id: string) => {
  console.log('getTaxons');
  const res = await spree.taxons.list({});
  if (res.isFail()) throw new Error('Failed to fetch data');
  return res.success().data;
});

export default async function DiseasesPage() {
  const taxons = await getTaxons();

  return (
    <div>
      <Specialities taxons={taxons} />
      <DiseasesAndConditions taxons={taxons} />
    </div>
  );
}
