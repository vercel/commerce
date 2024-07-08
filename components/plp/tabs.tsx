import { ChevronRightIcon } from '@heroicons/react/24/solid';
import PageContent from 'components/page/page-content';
import { getMetaobjectsByIds } from 'lib/shopify';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from './tab-components';

const TabPanelContent = async ({ ids }: { ids: string[] }) => {
  const content = await getMetaobjectsByIds(ids);

  return (
    <TabPanel className="flex min-w-full flex-col space-y-5">
      {content.map((block) => (
        <PageContent key={block.id} block={block} />
      ))}
    </TabPanel>
  );
};

const Tabs = async ({ tabItemIds }: { tabItemIds: string[] }) => {
  const tabItems = await getMetaobjectsByIds(tabItemIds);
  if (!tabItems || tabItems.length === 0) return null;

  return (
    <TabGroup vertical>
      <div className="flex w-full gap-x-10">
        <TabList className="flex shrink-0 basis-1/4 flex-col gap-2">
          {tabItems.map((item) => (
            <Tab
              key={item.id}
              className="flex items-center justify-between rounded-sm bg-gray-200/60 p-3 text-left text-sm font-medium text-black-700 focus:outline-none focus:ring-0 data-[selected]:bg-primary data-[selected]:text-white"
            >
              {item.title}
              <ChevronRightIcon className="size-4" />
            </Tab>
          ))}
        </TabList>
        <TabPanels className="flex basis-3/4">
          {tabItems.map((item) => (
            <TabPanelContent key={item.id} ids={item.content ? JSON.parse(item.content) : []} />
          ))}
        </TabPanels>
      </div>
    </TabGroup>
  );
};

export const TabsPlaceholder = () => {
  return (
    <div className="flex w-full gap-x-10">
      <div className="flex shrink-0 basis-1/4 animate-pulse flex-col gap-2">
        <div className="h-14 bg-gray-200/60" />
        <div className="h-14 bg-gray-200/60" />
        <div className="h-14 bg-gray-200/60" />
        <div className="h-14 bg-gray-200/60" />
        <div className="h-14 bg-gray-200/60" />
      </div>
      <div className="flex h-96 basis-3/4 animate-pulse rounded bg-gray-200/60" />
    </div>
  );
};
export default Tabs;
