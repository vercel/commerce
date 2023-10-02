'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Results } from '@orama/orama';
import { orama, trimDescription } from 'lib/orama';
import { createUrl } from 'lib/utils';
import { useOutsideClick } from './useOutsideClick';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<Results<any>>();
  const isSearchPage = usePathname() === '/search'


  useEffect(() => {
    setSearchValue(searchParams?.get('q') || '');
  }, [searchParams, setSearchValue]);

  useEffect(() => {

    if (isSearchPage) {
      router.push(createUrl('/search', new URLSearchParams({ q: searchValue })))
    } else {
      orama.search({
        term: searchValue,
        limit: 5,
        threshold: 0,
        boost: {
          title: 2,
        }
      })
        .then(setSearchResults)
        .catch(console.log);
    }

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

  const searchResultsRef = useRef(null);

  useOutsideClick(searchResultsRef.current, () => {
    setSearchValue('');
  });

  const showSearchResults = searchValue.length > 0 && !!searchResults && !isSearchPage;

  return (
    <form onSubmit={onSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        type="text"
        name="search"
        placeholder="Search for products..."
        autoComplete="off"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        defaultValue={searchParams?.get('q') || ''}
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
      {
        showSearchResults && (
          <ul ref={searchResultsRef} className='nextra-scrollbar border border-gray-200 bg-white text-gray-100 dark:border-neutral-800 dark:bg-neutral-900 absolute top-full z-20 mt-2 overflow-auto overscroll-contain rounded-xl py-2.5 shadow-xl max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)] md:max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)] inset-x-0 ltr:md:left-auto rtl:md:right-auto contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50 w-full min-h-[100px]'>
            {
              searchResults.count
                ? (
                  searchResults?.hits?.map((product) => (
                    <li key={product.id} className='mx-2.5 break-words rounded-md contrast-more:border text-gray-800 contrast-more:border-transparent dark:text-gray-300'>
                      <Link href={`/product/${product.document.handle}`} className='block scroll-m-12 px-2.5 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-10 hover:text-blue-500'>
                        <div className='text-base font-semibold leading-5'>
                          {product.document.title as string}
                        </div>
                        <div className='excerpt mt-1 text-sm leading-[1.35rem] text-gray-600 dark:text-gray-400 contrast-more:dark:text-gray-50'>
                          {trimDescription((product.document.description || product.document.title) as string)}
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className='mx-2.5 break-words rounded-md contrast-more:border text-gray-800 contrast-more:border-transparent dark:text-gray-300'>
                    <div className='block scroll-m-12 px-2.5 py-2 rounded-md'>
                      <div className='text-base font-semibold leading-5'>
                        No results found for &quot;{searchValue}&quot;
                      </div>
                    </div>
                  </li>
                )
            }
          </ul>
        )
      }
    </form>
  );
}
