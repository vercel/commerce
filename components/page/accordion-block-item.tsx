'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

const AccordionBlockItem = ({
  title,
  children,
  defaultOpen
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) => {
  return (
    <Disclosure defaultOpen={defaultOpen} as="div" className="pt-6">
      <dt>
        <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
          <span className="text-lg font-medium text-blue-800">{title}</span>
          <ChevronRightIcon className="size-5 group-data-[open]:rotate-90 group-data-[open]:text-primary" />
        </DisclosureButton>
      </dt>
      <DisclosurePanel as="dd" className="mt-2 flex flex-col gap-4 py-4">
        {children}
      </DisclosurePanel>
    </Disclosure>
  );
};

export default AccordionBlockItem;
