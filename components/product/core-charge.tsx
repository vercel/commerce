'use client';

import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import { CORE_VARIANT_ID_KEY, CORE_WAIVER } from 'lib/constants';
import { CoreChargeOption, ProductVariant } from 'lib/shopify/types';
import { cn, createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type CoreChargeProps = {
  variants: ProductVariant[];
};
const CoreCharge = ({ variants }: CoreChargeProps) => {
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

  const { coreCharge, waiverAvailable, coreVariantId } = variant ?? {};

  const handleSelectCoreChargeOption = (coreVariantId: string) => {
    optionSearchParams.set(CORE_VARIANT_ID_KEY, coreVariantId);

    const newUrl = createUrl(pathname, optionSearchParams);
    router.replace(newUrl, { scroll: false });
  };

  const coreChargeOptions = [
    waiverAvailable && {
      label: 'Waive Core',
      value: CORE_WAIVER,
      price: { amount: 0, currencyCode: variant?.price.currencyCode }
    },
    coreVariantId &&
      coreCharge && {
        label: 'Pay Core Upfront',
        value: coreVariantId,
        price: coreCharge
      }
  ].filter(Boolean) as CoreChargeOption[];

  if (!optionSearchParams.has(CORE_VARIANT_ID_KEY) && coreChargeOptions.length > 0) {
    handleSelectCoreChargeOption((coreChargeOptions[0] as CoreChargeOption).value);
  }

  return (
    <div className="flex flex-col text-xs lg:text-sm">
      <div className="mb-1 flex flex-row items-center space-x-1 divide-x divide-gray-400 leading-none lg:space-x-3">
        <div className="flex flex-row items-center space-x-2 text-base font-medium">
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          <span> Core charge </span>
        </div>
        <Link href="#" className="pl-2 text-blue-800 hover:underline">
          Understanding Core Charges and Returns
        </Link>
      </div>
      {/*
      Plan is to move this to within the a modal tht opens when a user clicks on Understanding Core Charges and Returns 
      <p className="mb-2 text-sm tracking-tight text-neutral-500">
        The core charge is a refundable deposit that is added to the price of the part. This charge
        ensures that the old, worn-out part is returned to the supplier for proper disposal or
        recycling. When you return the old part, you&apos;ll receive a refund of the core charge.
      </p> */}
      <ul className="flex min-h-16 flex-row space-x-4 pt-2">
        {coreChargeOptions.map((option) => (
          <li className="flex w-32" key={option.value}>
            <button
              onClick={() => handleSelectCoreChargeOption(option.value)}
              className={cn(
                'font-base flex w-full flex-col flex-wrap items-center justify-center space-y-0.5 rounded border text-center text-xs',
                {
                  'border-0 ring-2 ring-secondary': coreVariantIdSearchParam === option.value
                }
              )}
            >
              <span className="font-bold">{option.label}</span>
              <Price {...option.price} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoreCharge;
