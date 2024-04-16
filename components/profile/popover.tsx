'use client';

import { Popover, Transition } from '@headlessui/react';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { Menu } from 'lib/shopify/types';
import { Fragment } from 'react';
import OpenProfile from './open-profile';

type ProfilePopoverProps = {
  menu: Menu[];
};

const ProfilePopover = ({ menu }: ProfilePopoverProps) => {
  return (
    <Popover className="relative">
      <Popover.Button className="flex">
        <OpenProfile />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -right-10 z-10 mt-2 w-72 max-w-lg px-4 sm:px-0 lg:right-0">
          <div className="flex flex-col gap-2 overflow-hidden rounded-md bg-white px-4 py-3 text-black shadow-lg ring-1 ring-black/5">
            <span className="text-sm font-medium">My Account</span>
            <a
              href="#"
              className="mt-1 rounded-sm bg-primary p-2 text-center text-xs font-medium uppercase text-white hover:bg-secondary "
            >
              Sign in
            </a>
            {menu.length ? (
              <ul className="mt-2 flex w-full flex-col divide-y text-sm">
                {menu.map((menuItem) => (
                  <li className="cursor-pointer py-2 hover:underline" key={menuItem.title}>
                    <a
                      className="flex w-full flex-row items-center justify-between"
                      href={menuItem.path}
                    >
                      {menuItem.title} <ArrowRightIcon className="h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ProfilePopover;
