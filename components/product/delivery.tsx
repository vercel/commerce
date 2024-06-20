'use client';

import { TruckIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import SideDialog from 'components/side-dialog';
import { DELIVERY_OPTION_KEY } from 'lib/constants';
import { cn, createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useState } from 'react';

const options = ['Commercial', 'Residential'] as const;
type Option = (typeof options)[number];

export const deliveryOptions: Array<{
  key: Option;
  template: ReactNode;
  price: number;
}> = [
  {
    template: <span className="font-bold">Commercial</span>,
    price: 299,
    key: 'Commercial'
  },
  {
    template: <span className="font-bold">Residential</span>,
    price: 398,
    key: 'Residential'
  }
];

const Delivery = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [openingDialog, setOpeningDialog] = useState<'information' | 'terms-conditions' | null>(
    null
  );

  const newSearchParams = new URLSearchParams(searchParams.toString());
  const selectedDeliveryOption = newSearchParams.get(DELIVERY_OPTION_KEY);

  const handleSelectDelivery = (option: Option) => {
    newSearchParams.set(DELIVERY_OPTION_KEY, option);

    const newUrl = createUrl(pathname, newSearchParams);
    router.replace(newUrl, { scroll: false });
  };

  if (!selectedDeliveryOption) {
    handleSelectDelivery(options[0]);
  }

  return (
    <div className="flex flex-col text-xs lg:text-sm">
      <div className="mb-3 flex flex-row items-center space-x-1 divide-x divide-gray-400 leading-none lg:space-x-3">
        <div className="flex flex-row items-center space-x-2 text-base font-medium">
          <TruckIcon className="h-5 w-5" />
          <span>Delivery</span>
        </div>
        <div className="pl-2">
          <button
            onClick={() => setOpeningDialog('information')}
            className="text-xs text-blue-800 hover:underline lg:text-sm"
          >
            Information
          </button>
          <SideDialog
            title="Information"
            onClose={() => setOpeningDialog(null)}
            open={openingDialog === 'information'}
          >
            <p>Information</p>
          </SideDialog>
        </div>
        <div className="pl-2">
          <button
            onClick={() => setOpeningDialog('terms-conditions')}
            className="text-xs text-blue-800 hover:underline lg:text-sm"
          >
            Terms & Conditions
          </button>
          <SideDialog
            title="Terms & Conditions"
            onClose={() => setOpeningDialog(null)}
            open={openingDialog === 'terms-conditions'}
          >
            <p>Terms & Conditions</p>
          </SideDialog>
        </div>
      </div>
      <ul className="flex min-h-16 flex-row space-x-4 pt-2">
        {deliveryOptions.map((option) => (
          <li className="flex w-32" key={option.key}>
            <button
              onClick={() => handleSelectDelivery(option.key)}
              className={cn(
                'font-base flex w-full flex-col flex-wrap items-center justify-center space-y-0.5 rounded border text-center text-xs',
                {
                  'border-0 ring-2 ring-secondary': selectedDeliveryOption === option.key
                }
              )}
            >
              {option.template}
              <Price amount={String(option.price)} currencyCode="USD" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Delivery;
