import Manufacturers from 'components/manufacturers-grid/manufacturers';
import Tag from 'components/tag';
import TransmissionCode from 'components/transmission-codes';
import { getCollection } from 'lib/shopify';
import { Suspense } from 'react';

const { STORE_PREFIX } = process.env;

const manufactureVariant: Record<
  string,
  'home' | 'engines' | 'transmissions' | 'remanufactured-engines'
> = {
  'reman-transmission': 'transmissions',
  'car-part-planet': 'home',
  'reman-engine': 'remanufactured-engines',
  'transmission-locator': 'transmissions',
  'engine-locator': 'engines'
};

const TransmissionCodesBlock = async () => {
  const collection = await getCollection({ handle: 'transmissions' });

  if (!collection) {
    return null;
  }

  return <TransmissionCode collection={collection} />;
};

const InlinkBlock = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <Tag text="Get Started" />
      <div className="space-y-16">
        {STORE_PREFIX === 'reman-transmission' || STORE_PREFIX === 'transmission-locator' ? (
          <Suspense>
            <TransmissionCodesBlock />
          </Suspense>
        ) : null}
        <Suspense>
          <Manufacturers variant={manufactureVariant[STORE_PREFIX!]} />
        </Suspense>
      </div>
    </div>
  );
};

export default InlinkBlock;
