'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Metaobject } from 'lib/shopify/types';
import RichTextDisplay from './page/rich-text-display';

type DisplayTabsProps = {
  items: Metaobject[];
};
const DisplayTabs = ({ items }: DisplayTabsProps) => {
  if (items.length === 0) return null;

  return (
    <TabGroup>
      <TabList className="flex w-fit items-center rounded bg-gray-100 p-1">
        {items.map((item) => (
          <Tab
            key={item.title}
            className="w-fit cursor-pointer rounded bg-transparent px-6 py-1 text-center text-sm font-medium text-gray-600 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[selected]:bg-white data-[selected]:text-primary"
          >
            {item.title}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-3">
        {items.map((item) => (
          <TabPanel key={item.title}>
            <RichTextDisplay contentBlocks={JSON.parse(item.content || '{}').children} />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default DisplayTabs;
