'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Checkbox } from 'components/checkbox';
import CoreCharge from 'components/core-charge';
import Price from 'components/price';
import Tooltip from 'components/tooltip';
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
  console.log({ variant });
  return (
    <div className="mr-auto flex w-auto flex-row flex-wrap items-center gap-3 text-sm">
      <Price
        amount={variant?.price.amount || defaultPrice.amount}
        currencyCode={variant?.price.currencyCode || defaultPrice.currencyCode}
        className="text-lg font-semibold"
      />
      <CoreCharge variant={variant} />
      {variant?.coreCharge?.amount && variant.waiverAvailable ? (
        <div className="mt-1 flex w-full items-center space-x-3">
          <Checkbox id="payCoreCharge" />
          <label htmlFor="payCoreCharge" className="text-md flex items-center gap-1 leading-none">
            Pay a core charge of
            <Price
              amount={variant.coreCharge.amount}
              currencyCode={variant.coreCharge.currencyCode}
            />
            <span data-tooltip-id="payCoreCharge">
              <InformationCircleIcon className="ml-1 h-4 w-4 text-gray-500" />
            </span>
          </label>
          <Tooltip id="payCoreCharge">Select this if you do not have a core to return</Tooltip>
        </div>
      ) : null}
    </div>
  );
};

export default PriceWithCoreCharge;
