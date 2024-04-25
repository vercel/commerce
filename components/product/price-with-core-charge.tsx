'use client';

import CoreCharge from 'components/core-charge';
import Price from 'components/price';
import { Money, ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';

type PriceWithCoreChargeProps = {
  variants: ProductVariant[];
  defaultPrice: Money;
};

const PriceWithCoreCharge = ({ variants, defaultPrice }: PriceWithCoreChargeProps) => {
  const searchParams = useSearchParams();
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );

  const price = variant?.price.amount || defaultPrice.amount;

  return (
    <>
      <div className="mb-4">
        {variant && (
          <div className="flex flex-row items-center space-x-3 text-sm text-neutral-700">
            {variant.sku && <span>SKU: {variant.sku}</span>}
            {variant.barcode && <span>Part Number: {variant.barcode}</span>}
          </div>
        )}
      </div>
      <div className="mr-auto flex w-auto flex-row flex-wrap items-center gap-3 text-sm">
        <Price
          amount={price}
          currencyCode={variant?.price.currencyCode || defaultPrice.currencyCode}
          className="text-2xl font-semibold"
        />
        <CoreCharge variant={variant} />
      </div>
    </>
  );
};

export default PriceWithCoreCharge;
