'use client';

import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import SideDialog from 'components/side-dialog';
import { CORE_VARIANT_ID_KEY, CORE_WAIVER } from 'lib/constants';
import { CoreChargeOption, ProductVariant } from 'lib/shopify/types';
import { cn, createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useState } from 'react';

type CoreChargeProps = {
  variants: ProductVariant[];
  children: ReactNode;
};

const CoreCharge = ({ variants, children }: CoreChargeProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
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

  const openDialog = () => setIsOpenDialog(true);
  const closeDialog = () => setIsOpenDialog(false);

  return (
    <div className="flex flex-col text-xs lg:text-sm">
      <div className="mb-1 flex flex-row items-center space-x-1 divide-x divide-gray-400 leading-none lg:space-x-3">
        <div className="flex flex-row items-center space-x-2 text-base font-medium">
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          <span> Core charge </span>
        </div>
        <button className="pl-2 text-blue-800 hover:underline" onClick={openDialog}>
          How does the core charge work?
        </button>

        <SideDialog title="Core Charges and Returns" onClose={closeDialog} open={isOpenDialog}>
          {children}
        </SideDialog>
      </div>
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
