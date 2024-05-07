'use client';

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { defaultSort, sorting } from 'lib/constants';
import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
import SortingItem from './item';

const SortingMenu = () => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="group inline-flex justify-center rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
          <div className="flex items-center gap-2">
            Sort by:{' '}
            <span>
              {sorting.find((option) => option.slug === sort)?.title || defaultSort.title}
            </span>
          </div>
          <ChevronDownIcon
            className="-mr-1 ml-1.5 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sorting.map((option) => (
              <MenuItem key={option.title}>
                <div className="data-[focus]:bg-gray-100">
                  <SortingItem item={option} />
                </div>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default SortingMenu;
