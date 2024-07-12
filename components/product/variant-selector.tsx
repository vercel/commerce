'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Price from 'components/price';
import { CORE_VARIANT_ID_KEY, CORE_WAIVER } from 'lib/constants';
import { CoreChargeOption, Money, ProductOption, ProductVariant } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export function VariantSelector({
  options,
  variants,
  minPrice
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  minPrice: Money;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    // Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  const variantsById: Record<string, ProductVariant> = variants.reduce((acc, variant) => {
    return { ...acc, [variant.id]: variant };
  }, {});

  // Filter out variants that are not available for sale
  const availableVariants = variants.filter((variant) => variant.availableForSale);

  // Calculate minimum price from available variants
  const minAvailablePrice = availableVariants.length
    ? availableVariants.reduce(
        (min, variant) => Math.min(min, Number(variant.price.amount)),
        Number(availableVariants[0]?.price.amount)
      )
    : null;

  const currencyCode = availableVariants[0]?.price.currencyCode || 'USD';

  const updatedMinPrice = {
    amount: minAvailablePrice ? String(minAvailablePrice) : minPrice.amount,
    currencyCode: currencyCode
  };

  // If a variant is not selected, we want to select the first available for sale variant as default
  useEffect(() => {
    const hasSelectedVariant = Array.from(searchParams.entries()).some(([key, value]) => {
      return combinations.some((combination) => combination[key] === value);
    });

    if (!hasSelectedVariant) {
      const defaultVariant = variants.find((variant) => variant.availableForSale);
      if (defaultVariant) {
        const optionSearchParams = new URLSearchParams(searchParams.toString());
        defaultVariant.selectedOptions.forEach((option) => {
          optionSearchParams.set(option.name.toLowerCase(), option.value);
        });
        const defaultUrl = createUrl(pathname, optionSearchParams);
        router.replace(defaultUrl, { scroll: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="mb-6 flex flex-row gap-1 rounded-md border p-2 text-sm font-medium">
      See more Remanufactured and Used Options{' '}
      <button
        className="flex flex-row gap-0.5 font-normal text-blue-800 hover:underline"
        aria-label="Open variants selector"
        onClick={openModal}
      >
        from
        <Price amount={updatedMinPrice.amount} currencyCode={updatedMinPrice.currencyCode} />
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={closeModal} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[500px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Remanufactured & Used Options</p>

                <button aria-label="Close cart" onClick={closeModal} className="text-black">
                  <XMarkIcon className="h-6" />
                </button>
              </div>
              <div className="mt-5 flex h-full flex-col justify-between overflow-hidden">
                {options.map((option) => {
                  return (
                    <ul
                      key={option.id}
                      className="flex-grow flex-col space-y-4 overflow-auto px-2 py-4"
                    >
                      {option.values.map((value) => {
                        const optionNameLowerCase = option.name.toLowerCase();
                        const optionSearchParams = new URLSearchParams(searchParams.toString());

                        optionSearchParams.set(optionNameLowerCase, value);

                        // In order to determine if an option is available for sale, we need to:
                        //
                        // 1. Filter out all other param state
                        // 2. Filter out invalid options
                        // 3. Check if the option combination is available for sale
                        //
                        // This is the "magic" that will cross check possible variant combinations and preemptively
                        // disable combinations that are not available. For example, if the color gray is only available in size medium,
                        // then all other sizes should be disabled.
                        const filtered = Array.from(optionSearchParams.entries()).filter(
                          ([key, value]) =>
                            options.find(
                              (option) =>
                                option.name.toLowerCase() === key && option.values.includes(value)
                            )
                        );

                        const isAvailableForSale = combinations.find((combination) =>
                          filtered.every(
                            ([key, value]) =>
                              combination[key] === value && combination.availableForSale
                          )
                        );

                        const variant = isAvailableForSale
                          ? variantsById[isAvailableForSale.id]
                          : undefined;

                        const coreChargeOptions = [
                          variant?.waiverAvailable && {
                            label: 'Core Waiver',
                            value: CORE_WAIVER,
                            price: { amount: 0, currencyCode: variant?.price.currencyCode }
                          },
                          variant?.coreVariantId &&
                            variant.coreCharge && {
                              label: 'Core Charge',
                              value: variant.coreVariantId,
                              price: variant.coreCharge
                            }
                        ].filter(Boolean) as CoreChargeOption[];

                        // preset the first core charge option if not set
                        coreChargeOptions[0] &&
                          optionSearchParams.set(CORE_VARIANT_ID_KEY, coreChargeOptions[0].value);

                        const optionUrl = createUrl(pathname, optionSearchParams);

                        // The option is active if it's in the url params.
                        const isActive = searchParams.get(optionNameLowerCase) === value;

                        return (
                          <li
                            key={value}
                            className={clsx('flex w-full rounded border border-neutral-300', {
                              'cursor-default ring-2 ring-secondary': isActive,
                              'ring-2 ring-transparent hover:ring-secondary':
                                !isActive && isAvailableForSale,
                              'cursor-not-allowed opacity-60 ring-1 ring-neutral-300':
                                !isAvailableForSale
                            })}
                          >
                            <button
                              disabled={!isAvailableForSale}
                              aria-disabled={!isAvailableForSale}
                              onClick={() => {
                                router.replace(optionUrl, { scroll: false });
                                closeModal();
                              }}
                              className="flex w-full flex-col gap-2 px-4 py-3"
                            >
                              <div className="flex w-full flex-row items-center justify-between">
                                <div className="flex flex-col items-start gap-1">
                                  {variant ? (
                                    <Price
                                      amount={variant.price.amount}
                                      currencyCode={variant.price.currencyCode}
                                      className="text-base font-semibold"
                                    />
                                  ) : null}
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs font-medium text-gray-600">SKU:</span>
                                    <span className="text-xs text-gray-600">
                                      {variant?.sku || 'N/A'}
                                    </span>
                                  </div>
                                </div>
                                {!isAvailableForSale ? <span>Out of Stock</span> : null}
                              </div>
                              <div className="mt-1.5 flex flex-row flex-wrap items-center gap-3">
                                {coreChargeOptions.map((option) => (
                                  <div
                                    key={option.value}
                                    className={
                                      'flex flex-row items-center gap-2 rounded-full border border-neutral-300 bg-transparent px-3 py-1 text-xs'
                                    }
                                  >
                                    <span>{option.label}</span>
                                    <Price {...option.price} />
                                  </div>
                                ))}
                              </div>
                              <div className="mt-2 flex w-full flex-col gap-1 border-t border-gray-300 pl-1 pt-2 text-xs tracking-normal">
                                <div className="flex flex-row items-center gap-2">
                                  <span>Condition:</span>
                                  <span>{variant?.condition || 'N/A'}</span>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                  <span>Estimated Delivery:</span>
                                  <span>{variant?.estimatedDelivery || 'N/A'}</span>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                  <span>Mileage:</span>
                                  <span>{variant?.mileage || 'N/A'}</span>
                                </div>
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  );
                })}
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
}
