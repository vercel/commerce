'use client';
import { ShoppingCartIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Text from 'components/ui/text';
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import Divider from 'components/divider';
import Price from 'components/price';
import { Order } from 'lib/shopify/types';
import OrderSummary from './order-summary';

export default function OrderSummaryMobile({ order }: { order: Order }) {
  return (
    <div className="block lg:hidden">
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton className="flex w-full justify-between p-6">
              <div className="flex items-center gap-2 text-primary">
                <ShoppingCartIcon className="w-6" />
                <Text>{open ? 'Hide order summary' : 'Show order summary'}</Text>
                {open ? <ChevronUpIcon className="w-4" /> : <ChevronDownIcon className="w-4" />}
              </div>
              <Price
                amount={order.totalPrice!.amount}
                currencyCode={order.totalPrice!.currencyCode}
              />
            </DisclosureButton>

            <Transition
              enter="duration-200 ease-out"
              enterFrom="opacity-0 -translate-y-6"
              enterTo="opacity-100 translate-y-0"
              leave="duration-300 ease-out"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-6"
            >
              <DisclosurePanel className="origin-top p-6 text-gray-500 transition">
                <OrderSummary order={order} />
              </DisclosurePanel>
            </Transition>
          </>
        )}
      </Disclosure>
      <Divider hasSpacing={false} />
    </div>
  );
}
