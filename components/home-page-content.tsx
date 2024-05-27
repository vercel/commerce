import { getPage } from 'lib/shopify';
import PageContent from './page/page-content';

const HomePageContent = async () => {
  const page = await getPage('home-page');
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-16">
        {page.metaobjects?.map((content) => (
          <div key={content.id}>
            <PageContent block={content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageContent;
