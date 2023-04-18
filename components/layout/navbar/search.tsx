'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import SearchIcon from 'components/icons/search';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;

    if (search.value) {
      router.push(`/search?q=${search.value}`);
    } else {
      router.push(`/search`);
    }
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
        className="w-full py-2 px-4 text-black dark:bg-black dark:text-gray-100"
      />
      <div className="absolute top-0 right-0 mr-3 flex h-full items-center">
        <SearchIcon className="h-5" />
      </div>
    </form>
  );
}
