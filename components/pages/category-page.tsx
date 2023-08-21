import Search from '@/components/search/search';
import SearchResult from '@/components/search/search-result';
import Text from '@/components/ui/text/text';

export type CategoryPageParams = {
  data: object | any;
};

export default function CategoryPage({ data }: CategoryPageParams) {
  const category = data;

  const { title } = category;

  return (
    <div className="my-8 flex w-full flex-col px-4 lg:my-12 lg:px-8 2xl:px-16">
      {title && (
        <Text className="mb-8 lg:mb-12" variant="pageHeading">
          {title}
        </Text>
      )}
      <Search isCategory placeholder={title.toLowerCase()}>
        <SearchResult />
      </Search>
    </div>
  );
}
