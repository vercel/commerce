'use client';

import Price from 'components/price';
import { CORE_VARIANT_ID_KEY, CORE_WAIVER, DELIVERY_OPTION_KEY } from 'lib/constants';
import { Money, ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { deliveryOptions } from './delivery';

type PriceSummaryProps = {
  variants: ProductVariant[];
  defaultPrice: Money;
};

const PriceSummary = ({ variants, defaultPrice }: PriceSummaryProps) => {
  const searchParams = useSearchParams();

  const variant = variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );

  const price = variant?.price.amount || defaultPrice.amount;
  const selectedCoreChargeOption = searchParams.get(CORE_VARIANT_ID_KEY);
  const selectedDeliveryOption = searchParams.get(DELIVERY_OPTION_KEY);
  const deliveryPrice =
    deliveryOptions.find((option) => option.key === selectedDeliveryOption)?.price ?? 0;
  const currencyCode = variant?.price.currencyCode || defaultPrice.currencyCode;
  const corePrice = selectedCoreChargeOption === CORE_WAIVER ? 0 : variant?.coreCharge?.amount ?? 0;

  const totalPrice = Number(price) + deliveryPrice + Number(corePrice);
  return (
    <div className="mb-3 flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between">
        <span className="text-xl font-semibold">Our Price</span>
        <Price amount={price} currencyCode={currencyCode} className="text-2xl font-semibold" />
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-sm text-gray-400">{`Core Charge ${selectedCoreChargeOption === CORE_WAIVER ? '(Waived for 30 days)' : ''}`}</span>
        {selectedCoreChargeOption === CORE_WAIVER ? (
          <span className="text-sm text-gray-400">{`+$0.00`}</span>
        ) : (
          <Price
            amount={variant?.coreCharge?.amount ?? '0'}
            currencyCode={currencyCode}
            className="text-sm text-gray-400"
            prefix="+"
          />
        )}
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-sm text-gray-400">{`Flat Rate Shipping (${selectedDeliveryOption} address)`}</span>
        <Price
          amount={String(deliveryPrice)}
          currencyCode={currencyCode}
          className="text-sm text-gray-400"
          prefix="+"
        />
      </div>
      <hr />
      <div className="flex flex-row items-center justify-between">
        <span className="text-sm text-gray-400">To Pay Today</span>
        <Price
          amount={String(totalPrice)}
          currencyCode={currencyCode}
          className="text-sm text-gray-400"
        />
      </div>
    </div>
  );
};

export default PriceSummary;
