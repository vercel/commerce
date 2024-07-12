import { ChevronRightIcon } from '@heroicons/react/24/solid';
import RichTextDisplay from 'components/page/rich-text-display';
import Table from 'components/page/table';
import { getMetaobject } from 'lib/shopify';
import startCase from 'lodash.startcase';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from './tab-components';

const keySort: { [key: string]: number } = {
  title: 1,
  about: 2,
  upgrades: 3,
  history: 4,
  compatability: 5,
  remanufactured_transmissions: 6,
  remanufactured_engines: 7,
  used_transmissions: 8,
  used_engines: 9,
  core_return_policy: 10,
  shipping: 11,
  remanufactured_transmission_warranty: 12,
  remanufactured_engine_warranty: 13,
  used_transmission_warranty: 14,
  used_engine_warranty: 15,
  faqs: 16,
  best_price_guarantee: 17
};

const TabContent = async ({ id }: { id?: string }) => {
  if (!id) {
    return null;
  }

  const metaobject = await getMetaobject({ id });
  if (!metaobject || metaobject.type !== 'plp_content_tables') return null;

  return (
    <Table
      columns={JSON.parse(metaobject.columns || '[]')}
      data={JSON.parse(metaobject.data || '[]')}
      title={metaobject.name || 'Table'}
    />
  );
};

const Tabs = ({ fields }: { fields: { [key: string]: string } }) => {
  const keys = Object.keys(fields);

  if (!keys.length) {
    return null;
  }

  const isShopifyId = (value?: string) => value?.startsWith('gid://shopify');

  const sortedKeys = keys.sort((a, b) => {
    const orderA = keySort[a] ?? Infinity;
    const orderB = keySort[b] ?? Infinity;
    if (orderA === orderB) {
      return a.localeCompare(b);
    }
    return orderA - orderB;
  });

  return (
    <TabGroup vertical>
      <div className="flex w-full gap-x-10">
        <TabList className="flex shrink-0 basis-1/4 flex-col gap-2">
          {sortedKeys.map((key) => (
            <Tab
              key={key}
              className="flex items-center justify-between rounded-sm bg-gray-200/60 p-3 text-left text-sm font-medium text-content-strong focus:outline-none focus:ring-0 data-[selected]:bg-primary data-[selected]:text-white"
            >
              {startCase(key)}
              <ChevronRightIcon className="size-4" />
            </Tab>
          ))}
        </TabList>
        <TabPanels className="flex basis-3/4">
          {sortedKeys.map((key) => (
            <TabPanel className="flex min-w-full flex-col space-y-5" key={key}>
              {isShopifyId(fields[key]) ? (
                <TabContent id={fields[key]} />
              ) : (
                <RichTextDisplay contentBlocks={JSON.parse(fields[key] || '{}').children || []} />
              )}
            </TabPanel>
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
