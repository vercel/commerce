import EngineSizes from 'components/engine-sizes';
import Manufacturers from 'components/home-page/manufacturers';
import Content from 'components/plp/content';
import Tag from 'components/tag';
import TransmissionCode from 'components/transmission-codes';
import { getCollection } from 'lib/shopify';
import { Suspense } from 'react';

const manufactureVariantMap: Record<
  string,
  'engines' | 'transmissions' | 'remanufactured-engines' | 'transfer-cases'
> = {
  transmissions: 'transmissions',
  engines: 'engines',
  'remanufactured-engines': 'remanufactured-engines',
  'transfer-cases': 'transfer-cases'
};

const BottomContent = async ({ collectionHandle }: { collectionHandle: string }) => {
  const collection = await getCollection({ handle: collectionHandle });

  if (!collection) {
    return null;
  }

  const [partType] = collectionHandle.split('_');

  return (
    <div className="mx-auto my-10 flex max-w-7xl flex-col gap-3 px-6">
      <Suspense>
        <Content collection={collection} />
      </Suspense>
      {!collection.transmissionCodeLinks && !collection.engineSizeLinks ? null : (
        <div className="mt-10 space-y-3">
          <Tag text="Get Started" />
          <div className="space-y-16">
            <Suspense>
              <TransmissionCode collection={collection} />
            </Suspense>
            {!collection.plpType || collection.plpType === 'Product Type' ? (
              <Suspense>
                <Manufacturers variant={manufactureVariantMap[partType || 'engines']} />
              </Suspense>
            ) : null}
            <Suspense>
              <EngineSizes collection={collection} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomContent;
