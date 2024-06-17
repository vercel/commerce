'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

type DisclosureProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  title: string;
};

const DisclosureSection = ({ children, title, defaultOpen }: DisclosureProps) => {
  return (
    <Disclosure as="div" className="p-3" defaultOpen={defaultOpen}>
      <DisclosureButton className="group flex w-full items-center justify-between">
        <span className="font-medium">{title}</span>
        <ChevronDownIcon className="size-4 group-data-[open]:rotate-180" />
      </DisclosureButton>
      <DisclosurePanel className="mt-2 py-2 text-sm">{children}</DisclosurePanel>
    </Disclosure>
  );
};

export default DisclosureSection;
