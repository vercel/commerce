'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

const AccordionBlockItem = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <Disclosure as="div" className="pt-6">
      <dt>
        <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
          <span className="text-lg font-semibold leading-7">{title}</span>
          <ChevronDownIcon className="size-5 group-data-[open]:rotate-180" />
        </DisclosureButton>
      </dt>
      <DisclosurePanel as="dd" className="mt-2 flex flex-col gap-4 py-4 text-base text-gray-800">
        {children}
      </DisclosurePanel>
    </Disclosure>
  );
};

export default AccordionBlockItem;
