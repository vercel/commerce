import Search from '@/components/search/search';
import SearchResult from '@/components/search/search-result';
import Text from '@/components/ui/text/text';

interface SearchPageParams {
  data: object | any;
}

export default function SearchPage({ data }: SearchPageParams) {
  return (
    <div className="my-8 flex w-full flex-col px-4 lg:my-12 lg:px-8 2xl:px-16">
      <Text className="mb-8 lg:mb-12" variant="pageHeading">
        {data?.title}
      </Text>

      <Search>
        <SearchResult />
      </Search>
    </div>
  );
}
