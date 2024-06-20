'use client';

import { XMarkIcon } from '@heroicons/react/16/solid';
import { Filter } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SelectedList = ({ filters }: { filters: Filter[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedFilters = filters.flatMap(({ id, values }) => {
    const selectedValues = searchParams.getAll(id);
    if (selectedValues.length === 0) return [];
    return values
      .filter(({ value }) => selectedValues.includes(String(value)))
      .map(({ id: valueId, value, label }) => ({
        valueId,
        value,
        id,
        label
      }));
  });

  const handleClear = (id: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const selectedValues = newSearchParams.getAll(id);
    selectedValues.splice(selectedValues.indexOf(value), 1);
    newSearchParams.delete(id);
    for (const value of selectedValues) {
      newSearchParams.append(id, value);
    }

    router.replace(createUrl(pathname, newSearchParams), { scroll: false });
  };

  const handleClearAll = () => {
    const sort = searchParams.get('sort');
    const collection = searchParams.get('collection');
    const q = searchParams.get('q');
    const newSearchParams = new URLSearchParams({
      ...(sort && { sort }),
      ...(collection && { collection }),
      ...(q && { q })
    });
    router.replace(createUrl(pathname, newSearchParams), { scroll: false });
  };

  return selectedFilters.length ? (
    <div className="mt-5 flex flex-wrap gap-2 text-xs">
      {selectedFilters.map((filter) => (
        <div
          key={filter.valueId}
          className="flex items-center justify-between gap-2 rounded-full border bg-gray-100 px-2 py-1"
        >
          {filter.label}
          <button onClick={() => handleClear(filter.id, String(filter.value))}>
            <XMarkIcon className="size-4" />
          </button>
        </div>
      ))}
      <button
        onClick={handleClearAll}
        className="ml-2 tracking-wide text-secondary/80 underline hover:text-secondary"
      >
        Clear all
      </button>
    </div>
  ) : null;
};

export default SelectedList;
