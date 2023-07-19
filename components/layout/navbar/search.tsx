'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import SearchIcon from 'components/icons/search';
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
      className="relative m-0 flex w-full items-center border border-gray-200 bg-transparent p-0 dark:border-gray-500"
    >
      <input
        type="text"
        name="search"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full px-4 py-2 text-black dark:bg-black dark:text-gray-100"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <SearchIcon className="h-5" />
      </div>
    </form>
  );
}
