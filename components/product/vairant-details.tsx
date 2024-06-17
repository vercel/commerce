'use client';

import { CheckCircleIcon } from '@heroicons/react/24/outline';
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
    <div className="mt-1">
      <Price
        amount={price}
        currencyCode={variant?.price.currencyCode || defaultPrice.currencyCode}
        className="text-2xl font-semibold"
      />
      <div className="mt-2 flex items-center justify-start gap-x-2">
        {variant?.availableForSale ? (
          <div className="flex items-center gap-1 text-sm text-green-500">
            <CheckCircleIcon className="size-5" /> In Stock
          </div>
        ) : (
          <span className="text-sm text-red-600">Out of Stock</span>
        )}
        <p className="text-sm">Condition: {variant?.condition || 'N/A'}</p>
      </div>
    </div>
  );
};

export default VariantDetails;
