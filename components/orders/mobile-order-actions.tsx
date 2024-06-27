'use client';

import { Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Order, ShopifyOrderMetafield, WarrantyStatus } from 'lib/shopify/types';
import { isBeforeToday } from 'lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import ActivateWarrantyModal from './activate-warranty-modal';

const MobileOrderActions = ({
  order,
  orderMetafields
}: {
  order: Order;
  orderMetafields?: ShopifyOrderMetafield;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isWarrantyActivated = orderMetafields?.warrantyStatus?.value === WarrantyStatus.Activated;
  const isPassDeadline = isBeforeToday(orderMetafields?.warrantyActivationDeadline?.value);

  return (
    <>
      <Menu as="div" className="relative flex justify-end lg:hidden">
        <div className="flex items-center">
          <MenuButton className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Options for order {order.name}</span>
            <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              {({ focus }) => (
                <Link
                  href={`/account/orders/${order.normalizedId}`}
                  className={clsx(
                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  View
                </Link>
              )}
            </MenuItem>
            {!isPassDeadline && !isWarrantyActivated && (
              <MenuItem>
                {({ focus }) => (
                  <Button
                    className={clsx(
                      focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'flex w-full px-4 py-2 text-sm'
                    )}
                    onClick={() => setIsOpen(true)}
                  >
                    Activate Warranty
                  </Button>
                )}
              </MenuItem>
            )}
          </div>
        </MenuItems>
      </Menu>
      <ActivateWarrantyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        orderId={order.id}
        orderMetafields={orderMetafields}
      />
    </>
  );
};

export default MobileOrderActions;
