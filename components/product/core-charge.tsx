'use client';

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import SideDialog from 'components/side-dialog';
import { CORE_VARIANT_ID_KEY, CORE_WAIVER, phoneNumber } from 'lib/constants';
import { CoreChargeOption, ProductVariant } from 'lib/shopify/types';
import { cn, createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type CoreChargeProps = {
  variants: ProductVariant[];
};
const CoreCharge = ({ variants }: CoreChargeProps) => {
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
          <div className="mt-5 flex h-full flex-col space-y-5 overflow-hidden">
            <section>
              <p className="text-md mb-3 font-semibold">What is a core charge?</p>
              <p className="mb-3 text-sm">
                When you purchase a remanufactured transmission, the price assumes that you return
                your old transmission. This old part is called a core.
              </p>
              <p className="text-sm">
                The core charge is a refundable deposit that is added to the price of the part to
                ensure that the old part is returned for proper disposal or remanufacturing. When
                you return the old part, you receive a refund of the core charge.
              </p>
            </section>

            <section>
              <p className="text-md mb-3 font-semibold">Understanding our core waiver</p>
              <p className="mb-3 text-sm">
                At Transmission Locator, we offer a 30-day core waiver option on some of our
                transmissions. This means that you can choose to waive the core deposit for up to 30
                days after your purchase. As long as you return your old part within the 30-day
                period, you will never need to pay the core charge.
              </p>
              <p className="text-sm">
                If you don&apos;t manage to return the old part within the 30-day period, we will
                then charge you the core charge. This keeps more money in your pocket upfront.
              </p>
            </section>

            <section>
              <p className="text-md mb-3 font-semibold">Returning your core</p>
              <p className="text-sm">
                We will pick up your core at no cost to you. Simply let us know that the core is
                ready and we will send you a prepaid label, as well as a driver to pick up the core.
              </p>
            </section>

            <section>
              <div className="rounded-md border border-blue-700 bg-blue-50 p-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0 px-2">
                    <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-blue-700">
                      Have questions? Speak to a specialist now:
                    </p>
                    <div className="md:flex md:justify-between">
                      <p className="mt-1 text-blue-700 md:mt-0">
                        <a
                          href={phoneNumber?.link}
                          className="whitespace-nowrap text-blue-700 hover:text-blue-600"
                        >
                          {phoneNumber?.title}
                          <span aria-hidden="true"> &rarr;</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
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
