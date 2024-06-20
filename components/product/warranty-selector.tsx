'use client';

import Price from 'components/price';
import { cn } from 'lib/shopify/utils';
import { ReactNode, useState } from 'react';

const options = ['Included', 'Premium Labor', '+1 Year'] as const;
type Option = (typeof options)[number];

const plans: Array<{
  key: Option;
  template: ReactNode;
  price: number;
}> = [
  {
    template: <span className="font-bold">3-Year Warranty</span>,
    price: 0,
    key: 'Included'
  },
  {
    template: <span className="font-bold">Premium Labor</span>,
    price: 150,
    key: 'Premium Labor'
  },
  {
    template: <span className="font-bold">+1 Year</span>,
    price: 100,
    key: '+1 Year'
  }
];
const WarrantySelector = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option>('Included');
  return (
    <ul className="flex min-h-16 flex-row space-x-4 pt-2">
      {plans.map((plan) => (
        <li key={plan.key} className="flex w-32">
          <button
            onClick={() => setSelectedOptions(plan.key)}
            className={cn(
              'font-base flex w-full flex-col flex-wrap items-center justify-center space-y-0.5 rounded border text-center text-xs',
              {
                'border-0 ring-2 ring-secondary': plan.key === selectedOptions
              }
            )}
          >
            {plan.template}
            <Price amount={String(plan.price)} currencyCode="USD" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default WarrantySelector;
