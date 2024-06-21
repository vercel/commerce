'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { createUrl } from 'lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Search.module.scss'; // Importing the SCSS module

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
    <form onSubmit={onSubmit} className={styles.searchForm}>
      <input
        key={searchParams?.get('q')}
        type="text"
        name="search"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className={styles.searchInput}
      />
      <div className={styles.searchIconContainer}>
        <MagnifyingGlassIcon className={styles.searchIcon} />
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className={styles.searchForm}>
      <input placeholder="Search for products..." className={styles.searchInput} />
      <div className={styles.searchIconContainer}>
        <MagnifyingGlassIcon className={styles.searchIcon} />
      </div>
    </form>
  );
}
