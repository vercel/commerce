'use client';

import Price from 'components/price';
import { Money, ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';

type PriceWithCoreChargeProps = {
  variants: ProductVariant[];
  defaultPrice: Money;
};

const VariantPrice = ({ variants, defaultPrice }: PriceWithCoreChargeProps) => {
  const searchParams = useSearchParams();
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );

  const price = variant?.price.amount || defaultPrice.amount;

  return (
    <Price
      amount={price}
      currencyCode={variant?.price.currencyCode || defaultPrice.currencyCode}
      className="text-2xl font-semibold"
    />
  );
};

export default VariantPrice;
