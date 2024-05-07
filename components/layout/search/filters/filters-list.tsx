'use client';
import clsx from 'clsx';
import { Filter } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filters = ({ filters }: { filters: Filter[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { q, sort, collection } = Object.fromEntries(searchParams);
  const initialFilters = {
    ...(q && { q }),
    ...(sort && { sort }),
    ...(collection && { collection })
  };

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

  return (
    <form onChange={handleChange} className="space-y-5 divide-y divide-gray-200">
      {filters.map(({ label, id, values }) => (
        <div key={id} className="flex h-auto max-h-[550px] flex-col gap-y-3 overflow-hidden pt-5">
          <div className="block text-sm font-medium text-gray-900">{label}</div>
          <div className="flex-grow space-y-3 overflow-auto pb-1 pl-1 pt-2">
            {values.map(({ id: valueId, label, count, value }) => (
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
                />
                <span>{`${label} (${count})`}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
};

export default Filters;
