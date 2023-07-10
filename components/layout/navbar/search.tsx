'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { createUrl } from 'lib/utils';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex items-center w-full p-0 m-0 bg-transparent border border-gray-200 dark:border-gray-500"
    >
      <input
        type="text"
        name="search"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full px-4 py-2 text-black dark:bg-black dark:text-gray-100"
      />
      <div className="absolute top-0 right-0 flex items-center h-full mr-3">
        <MagnifyingGlassIcon className="h-5" />
      </div>
    </form>
  );
}
