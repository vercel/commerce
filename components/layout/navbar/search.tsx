'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { createUrl } from 'lib/utils';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setSearchValue(searchParams?.get('q') || '');
  }, [searchParams, setSearchValue]);

  useEffect(() => {
    fetch(`/api/search?q=${searchValue}`)
      .then((res) => res.json())
      .then((data) => setSearchResults(data));
  }, [searchValue]);

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
    <>
      <form onSubmit={onSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
        <input
          type="text"
          name="search"
          placeholder="Search for products..."
          autoComplete="off"
          value={searchValue}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <MagnifyingGlassIcon className="h-4" />
        </div>
        <SearchResults show={showResults} searchResults={searchResults} query={searchValue} />
      </form>
    </>
  );
}

function SearchWindowContainer({ children }: { children: ReactNode }) {
  return (
    <div className="absolute z-50 mt-2.5 w-full rounded-lg border bg-white px-4 py-2 text-sm text-black backdrop-blur-3xl placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400">
      {children}
    </div>
  );
}

function SearchResults({ searchResults, query, show }) {
  function breakSentence(sentence: string) {
    if (sentence.length > 50) {
      return sentence.slice(0, 50) + '...';
    }

    return sentence;
  }

  const shouldShow = show && searchResults?.count;

  if (!shouldShow) return null;

  if (searchResults?.count)
    return (
      <SearchWindowContainer>
        {searchResults?.count &&
          searchResults.groups.map((group) => (
            <div className="py-2">
              <div className="mb-2 border-b border-b-neutral-600 pb-1 text-xs font-semibold uppercase text-neutral-400">
                {' '}
                {group.values?.[0]}{' '}
              </div>
              {group.result.map(({ document }) => (
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    href={`/product/${document.handle}`}
                    className="rounded-lg px-1.5 py-2 hover:bg-blue-600 hover:bg-opacity-20"
                  >
                    <span className="font-bold text-neutral-200"> {document.title} </span>
                    <br />
                    <span className="break-words text-neutral-400">
                      {' '}
                      {breakSentence(document.description)}{' '}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          ))}
      </SearchWindowContainer>
    );

  if (!searchResults?.count) {
    return (
      <SearchWindowContainer>
        <div className="p-4 text-center">No results found for "{query}"</div>
      </SearchWindowContainer>
    );
  }
}
