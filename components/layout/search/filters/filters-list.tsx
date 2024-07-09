'use client';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Filter, FilterType } from 'lib/shopify/types';
import { createUrl, getInitialSearchParams } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PriceRange from './price-range';
import SelectedList from './selected-list';

const Filters = ({ filters, defaultOpen = true }: { filters: Filter[]; defaultOpen?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialFilters = getInitialSearchParams(searchParams);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const newSearchParams = new URLSearchParams(initialFilters);

    Array.from(formData.keys()).forEach((key) => {
      const values = formData.getAll(key);
      newSearchParams.delete(key);
      values.forEach((value) => newSearchParams.append(key, String(value)));
    });

    router.replace(createUrl(pathname, newSearchParams), { scroll: false });
  };

  if (filters.length === 0) return null;

  return (
    <>
      <SelectedList filters={filters} />
      <form onChange={handleChange} className="space-y-5 divide-y divide-gray-200 border-b pb-3">
        {filters.map(({ label, id, values, type }) => (
          <Disclosure
            key={id}
            as="div"
            className="flex h-auto max-h-[300px] flex-col gap-y-3 overflow-hidden pt-5"
            defaultOpen={defaultOpen}
          >
            <DisclosureButton className="group flex items-center justify-between">
              <div className="text-sm font-medium text-gray-900">{label}</div>
              <ChevronDownIcon
                aria-label="Toggle opening filters block"
                className="size-4 group-data-[open]:rotate-180"
              />
            </DisclosureButton>
            <DisclosurePanel className="flex-grow space-y-3 overflow-auto pb-1 pl-1 pt-2">
              {type === FilterType.PRICE_RANGE ? (
                <PriceRange id={id} values={values} />
              ) : (
                values.map(({ id: valueId, label, count, value }) => (
                  <label
                    key={valueId}
                    htmlFor={valueId}
                    className={clsx('flex items-center gap-2 text-sm text-gray-600', {
                      'cursor-not-allowed opacity-50': count === 0
                    })}
                  >
                    <input
                      id={valueId}
                      name={id}
                      defaultChecked={searchParams.getAll(id).includes(String(value))}
                      type="checkbox"
                      value={String(value)}
                      className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={count === 0}
                      key={searchParams.getAll(id).length}
                    />
                    <span>{`${label} (${count})`}</span>
                  </label>
                ))
              )}
            </DisclosurePanel>
          </Disclosure>
        ))}
      </form>
    </>
  );
};

export default Filters;
