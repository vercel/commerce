'use client';

import Price from 'components/price';
import { cn } from 'lib/utils';
import { ReactNode, useState } from 'react';

const options = ['Included', 'Premium Labor', '+1 Year'] as const;
type Option = (typeof options)[number];

const plans: Array<{
  key: Option;
  template: ReactNode;
  price: number;
}> = [
  {
    template: (
      <>
        <span>Included</span>
        <span>3-Year Warranty</span>
      </>
    ),
    price: 0,
    key: 'Included'
  },
  {
    template: <span>Premium Labor</span>,
    price: 150,
    key: 'Premium Labor'
  },
  {
    template: <span>+1 Year</span>,
    price: 100,
    key: '+1 Year'
  }
];
const WarrantySelector = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option>('Included');
  return (
    <ul className="flex min-h-16 flex-row space-x-4 pt-2">
      {plans.map((plan) => (
        <li
          key={plan.key}
          onClick={() => setSelectedOptions(plan.key)}
          className={cn(
            'flex  w-32 cursor-pointer flex-col items-center justify-center space-y-2 rounded-md border p-2 text-xs font-medium',
            { 'ring-2 ring-secondary': plan.key === selectedOptions }
          )}
        >
          {plan.template}
          <Price amount={String(plan.price)} currencyCode="USD" />
        </li>
      ))}
    </ul>
  );
};

export default WarrantySelector;
