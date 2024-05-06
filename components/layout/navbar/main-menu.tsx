'use client';

import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';

const MainMenu = ({ menu }: { menu: Menu[] }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState('');

  return menu.length ? (
    <div className="mt-2 hidden h-11 w-full border-b text-sm font-medium md:flex">
      <Popover.Group as={Fragment}>
        <div className="z-10 flex h-full w-full items-center justify-center gap-8 px-4 lg:gap-16">
          {menu.map((item: Menu) => {
            const isActiveItem =
              item.path === pathname ||
              item.items.some((subItem: Menu) => subItem.path === pathname);
            if (!item.items.length) {
              return (
                <Link
                  key={item.title}
                  href={item.path}
                  className={`flex h-full items-center ${isActiveItem ? 'text-black' : 'text-neutral-600 hover:text-black'}`}
                >
                  {item.title}
                </Link>
              );
            }

            const isOpen = open === item.path;
            return (
              <Popover key={item.title} className="relative flex h-full">
                <div
                  className="relative flex"
                  onMouseOver={() => setOpen(item.path)}
                  onMouseLeave={() => setOpen('')}
                >
                  <Link
                    href={item.path}
                    className={clsx(
                      'relative z-10 flex items-center border-b-2 px-2 pt-px transition-colors duration-200 ease-out focus-visible:ring-0 focus-visible:ring-offset-0',
                      {
                        'border-gray-500 text-black': isOpen || isActiveItem,
                        'border-transparent text-neutral-600 hover:text-black':
                          !isOpen && !isActiveItem
                      }
                    )}
                  >
                    {item.title}
                  </Link>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    show={isOpen}
                  >
                    <Popover.Panel
                      static
                      className="absolute inset-x-0 left-1/2 top-full z-10 mt-0.5 min-w-32 max-w-sm -translate-x-1/2 transform text-sm"
                    >
                      <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black/5">
                        <ul className="flex flex-col space-y-2 bg-white px-4 py-3">
                          {item.items.map((subItem: Menu) => (
                            <li key={subItem.title}>
                              <Link
                                href={subItem.path}
                                className={`border-b ${subItem.path === pathname ? 'border-black text-black' : 'border-transparent text-neutral-600 hover:text-black'}`}
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </div>
              </Popover>
            );
          })}
        </div>
      </Popover.Group>
    </div>
  ) : null;
};

export default MainMenu;
