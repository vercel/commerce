'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Filter } from 'lib/shopify/types';
import { Fragment, ReactNode, useState } from 'react';
import Filters from './filters-list';

const MobileFilters = ({ filters, menu }: { filters: Filter[]; menu: ReactNode }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        className="flex items-center gap-2 rounded border border-gray-300 px-3 py-1 text-sm text-gray-700"
        onClick={() => setOpenDialog(true)}
      >
        Filters
        <FunnelIcon className="size-4" />
      </button>
      <Transition show={openDialog}>
        <Dialog as="div" className="relative z-40" onClose={setOpenDialog}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setOpenDialog(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="size-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-4 border-t border-gray-200 px-4 pt-4">
                  {menu}
                  <Filters filters={filters} defaultOpen={false} />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MobileFilters;
