'use client';
import { Disclosure } from '@headlessui/react';
import { ReactNode } from 'react';

export const DisclosureSection = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <Disclosure>
      <Disclosure.Button className="w-full py-2 text-black">
        <div className="flex items-center justify-between">
          <h3 className=" grow truncate text-left text-base font-medium group-hover:underline">
            {title}
          </h3>
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="group-data-open:-scale-y-100 shrink-0 transition-transform"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel className="text-gray-500">{children}</Disclosure.Panel>
    </Disclosure>
  );
};
