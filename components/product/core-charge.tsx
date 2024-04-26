'use client';

import Price from 'components/price';
import { CORE_VARIANT_ID_KEY, CORE_WAIVER } from 'lib/constants';
import { Money, ProductVariant } from 'lib/shopify/types';
import { cn, createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type CoreChargeProps = {
  variants: ProductVariant[];
  defaultPrice: Money;
};
const CoreCharge = ({ variants, defaultPrice }: CoreChargeProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const optionSearchParams = new URLSearchParams(searchParams);
  const coreVariantIdSearchParam = optionSearchParams.get(CORE_VARIANT_ID_KEY);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === optionSearchParams.get(option.name.toLowerCase())
    )
  );

  const { coreCharge, waiverAvailable } = variant ?? {};

  const handleSelectCoreChargeOption = (action: 'add' | 'remove') => {
    if (action === 'add' && variant?.coreVariantId) {
      optionSearchParams.set(CORE_VARIANT_ID_KEY, variant.coreVariantId);
    } else if (action === 'remove') {
      optionSearchParams.set(CORE_VARIANT_ID_KEY, CORE_WAIVER);
    }

    const newUrl = createUrl(pathname, optionSearchParams);
    router.replace(newUrl, { scroll: false });
  };

  // if the selected variant has changed, and the core change variant id is not the same as the selected variant id
  // or if users have selected the core waiver but the selected variant does not have a waiver available
  // we remove the core charge from the url
  if (
    variant?.coreVariantId &&
    optionSearchParams.has(CORE_VARIANT_ID_KEY) &&
    (coreVariantIdSearchParam !== CORE_WAIVER || !variant.waiverAvailable) &&
    coreVariantIdSearchParam !== variant.coreVariantId
  ) {
    optionSearchParams.delete(CORE_VARIANT_ID_KEY);
    const newUrl = createUrl(pathname, optionSearchParams);
    router.replace(newUrl, { scroll: false });
  }

  const selectedPayCoreCharge = coreVariantIdSearchParam === variant?.coreVariantId;
  const selectedCoreWaiver = coreVariantIdSearchParam === CORE_WAIVER;

  return (
    <div className="flex flex-col text-xs lg:text-sm">
      <div className="mb-2 text-base font-medium">Core Charge</div>
      <p className="mb-2 text-sm tracking-tight text-neutral-500">
        The core charge is a refundable deposit that is added to the price of the part. This charge
        ensures that the old, worn-out part is returned to the supplier for proper disposal or
        recycling. When you return the old part, you&apos;ll receive a refund of the core charge.
      </p>
      <ul className="flex min-h-16 flex-row space-x-4 pt-2">
        {waiverAvailable ? (
          <li className="flex w-32">
            <button
              onClick={() => handleSelectCoreChargeOption('remove')}
              className={cn(
                'flex w-full flex-col flex-wrap items-center justify-center space-y-2 rounded-md border p-2 text-center text-xs font-medium',
                {
                  'ring-2 ring-secondary': selectedCoreWaiver
                }
              )}
            >
              <span>Core Waiver</span>
              <Price amount="0" currencyCode={defaultPrice.currencyCode} />
            </button>
          </li>
        ) : null}
        {coreCharge && variant?.coreVariantId ? (
          <li className="flex w-32">
            <button
              onClick={() => handleSelectCoreChargeOption('add')}
              className={cn(
                'flex w-full flex-col flex-wrap items-center justify-center space-y-2 rounded-md border p-2 text-center text-xs font-medium',
                {
                  'ring-2 ring-secondary': selectedPayCoreCharge
                }
              )}
            >
              <span>Core Charge</span>
              <Price amount={coreCharge.amount} currencyCode={coreCharge.currencyCode} />
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default CoreCharge;
