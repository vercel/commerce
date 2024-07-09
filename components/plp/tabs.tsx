import { ChevronRightIcon } from '@heroicons/react/24/solid';
import RichTextDisplay from 'components/page/rich-text-display';
import startCase from 'lodash.startcase';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from './tab-components';

const Tabs = ({ fields }: { fields: { [key: string]: string } }) => {
  const keys = Object.keys(fields);

  if (!keys.length) {
    return null;
  }

  return (
    <TabGroup vertical>
      <div className="flex w-full gap-x-10">
        <TabList className="flex shrink-0 basis-1/4 flex-col gap-2">
          {keys.map((key) => (
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
          {keys.map((key) => (
            <TabPanel className="flex min-w-full flex-col space-y-5" key={key}>
              <RichTextDisplay contentBlocks={JSON.parse(fields[key] || '{}').children || []} />
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
