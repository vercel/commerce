'use client';

import Price from 'components/price';
import { Money, ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';

type VariantDetailsProps = {
  variants: ProductVariant[];
  defaultPrice: Money;
};

const VariantDetails = ({ variants, defaultPrice }: VariantDetailsProps) => {
  const searchParams = useSearchParams();
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );

  const price = variant?.price.amount || defaultPrice.amount;

  return (
    <>
      <div className="mb-5 flex items-center justify-start gap-x-2">
        <p className="text-sm">SKU: {variant?.sku || 'N/A'}</p>
        <p className="text-sm">Condition: {variant?.condition || 'N/A'}</p>
      </div>
      <Price
        amount={price}
        currencyCode={variant?.price.currencyCode || defaultPrice.currencyCode}
        className="text-2xl font-semibold"
      />
    </>
  );
};

export default VariantDetails;
