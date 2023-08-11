'use client';

import { cn } from 'lib/utils';
import { useTranslations } from 'next-intl';
import SearchRoot from './search-root';

import { SearchBox } from 'react-instantsearch';

import { ReactNode } from 'react';
import { NoResults, NoResultsBoundary } from './no-result';

interface SearchProps {
  placeholder?: string;
  className?: string;
  children: ReactNode;
  isCategory?: boolean;
}

export default function Search({ placeholder, children, isCategory = false }: SearchProps) {
  const t = useTranslations('search');

  return (
    <SearchRoot>
      {/* Search top */}
      <div className="">
        <SearchBox
          placeholder={
            placeholder
              ? `${isCategory ? `${t('searchCategory')} ${placeholder}` : placeholder}`
              : `${t('globalPlaceholder')}`
          }
          classNames={{
            root: cn('flex max-w-lg'),
            form: 'relative w-full',
            input:
              'block w-full outline-offset-0 appearance-none rounded-none h-11 px-11 pr-3 py-2 bg-white border border-ui-border',
            submit: 'absolute flex items-center justify-center top-0 left-0 bottom-0 w-11 h-11',
            submitIcon: 'w-4 h-4',
            reset: 'absolute items-center justify-center top-0 right-0 bottom-0 w-11 h-11',
            resetIcon: 'w-3 h-3 mx-auto bg-app'
          }}
        />
      </div>

      <NoResultsBoundary fallback={<NoResults />}>{children}</NoResultsBoundary>
    </SearchRoot>
  );
}
