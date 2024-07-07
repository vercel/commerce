import PageContent from 'components/page/page-content';
import { getMetaobject, getMetaobjectsByIds } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { getSelectedProductVariant } from 'lib/utils';

const AdditionalInformation = async ({
  product,
  searchParams
}: {
  product: Product;
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const selectedVariant = getSelectedProductVariant({ product, searchParams });

  if (!selectedVariant) return null;

  const pdpContent = await getMetaobject({
    handle: {
      handle: `${selectedVariant.condition}-${product.productType}`.toLowerCase(),
      type: 'pdp_content'
    }
  });

  if (!pdpContent) return null;

  const contentIds = pdpContent.content ? JSON.parse(pdpContent.content) : [];
  const pageContent = await getMetaobjectsByIds(contentIds);

  return (
    <div className="my-6 w-full divide-y">
      {pageContent.map((block) => (
        <div key={block.id} className="py-5">
          <PageContent block={block} />
        </div>
      ))}
    </div>
  );
};

export default AdditionalInformation;
