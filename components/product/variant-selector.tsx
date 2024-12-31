'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { Attribute } from 'lib/woocomerce/models/base';
import { ProductVariations } from 'lib/woocomerce/models/product';

type FilterVariation = {
  name: string | undefined;
  values: string[] | undefined;
};

export function VariantSelector({
  options,
  variations
}: {
  options: Partial<Attribute>[];
  variations: ProductVariations[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();

  const combinations: FilterVariation[] = options?.map((attribute) => ({
    name: attribute.name,
    values: attribute?.options?.map((option) => option)
  }));

  return combinations.map((option) => (
    <form key={option.name}>
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
        <dd className="flex flex-wrap gap-3">
          {option?.values?.map((value) => {
            const optionNameLowerCase = option?.name?.toLowerCase();
            // The option is active if it's in the selected options.
            const isActive = optionNameLowerCase ? state[optionNameLowerCase] === value : false;

            return (
              <button
                formAction={() => {
                  if (!optionNameLowerCase) return;
                  let newState = updateOption(optionNameLowerCase, value);
                  const keys = Object.keys(newState).filter(
                    (key) => key !== 'id' && key !== 'image' && key !== 'variation'
                  );
                  const variant = variations
                    .find((variation) => {
                      return variation?.attributes?.every(
                        (attr) =>
                          attr.name &&
                          keys.includes(attr.name) &&
                          newState[attr.name] === attr.option
                      );
                    })
                    ?.id?.toString();
                  if (variant) {
                    newState = { ...newState, variation: variant };
                  }
                  updateURL(newState);
                }}
                key={value}
                title={`${option.name} ${value}`}
                className={clsx(
                  'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                  {
                    'cursor-default ring-2 ring-blue-600': isActive,
                    'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-blue-600':
                      !isActive,
                    'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
                      ''
                  }
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
