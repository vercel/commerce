'use client';

import Price from 'components/price';
import { cn } from 'lib/utils';
import { ReactNode, useState } from 'react';

const options = ['Included', 'Premium Labor', '+1 Year'] as const;
type Option = (typeof options)[number];

const formatWarrantyYears = (years: string) => {
  const yearsNum = parseFloat(years);
  if (yearsNum === 1.5) {
    return '18-Month';
  } else if (yearsNum === 1) {
    return '12-Month';
  } else {
    return `${yearsNum}-Year`;
  }
};

const WarrantySelector = ({ years }: { years: string }) => {
  const [selectedOptions, setSelectedOptions] = useState<Option>('Included');

  const plans: Array<{
    key: Option;
    template: ReactNode;
    price: number;
  }> = [
    {
      template: <span className="font-bold">{`${formatWarrantyYears(years)} Warranty`}</span>,
      price: 0,
      key: 'Included'
    }
  ];

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
