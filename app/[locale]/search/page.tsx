'use client';

import Search from '@/components/search/search';
import SearchResult from '@/components/search/search-result';
import Text from '@/components/ui/text/text';
import { useTranslations } from 'next-intl';

export default function SearchPage() {
  const t = useTranslations('search');

  return (
    <div className="my-8 flex w-full flex-col px-4 lg:my-12 lg:px-8 2xl:px-16">
      <Text className="mb-8 lg:mb-12" variant="pageHeading">
        {t('search')}
      </Text>

      <Search>
        <SearchResult />
      </Search>
    </div>
  );
}
