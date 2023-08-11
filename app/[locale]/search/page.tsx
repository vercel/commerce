'use client';

import Search from '@/components/search/search';
import SearchResult from '@/components/search/search-result';
import { useTranslations } from 'next-intl';

export default function SearchPage() {
  const t = useTranslations('search');

  return (
    <div className="my-8 flex w-full flex-col px-4 lg:my-12 lg:px-8 2xl:px-16">
      <Search title={t('search')}>
        <SearchResult />
      </Search>
    </div>
  );
}
