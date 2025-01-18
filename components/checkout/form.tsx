'use client';
import { Avatar, Input, Select, SelectItem } from '@nextui-org/react';
import clsx from 'clsx';
import { getCountries } from 'lib/utils';
import { Billing } from 'lib/woocomerce/models/billing';
import { Shipping } from 'lib/woocomerce/models/shipping';
import { useCheckout } from './checkout-provider';

const optionalFields = ['company', 'address_2'];

export default function ShippingForm({
  className,
  title,
  onChangeInput,
  error
}: {
  className?: string;
  title?: string;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: Shipping | Billing | undefined;
}) {
  const countries = getCountries();

  const { checkout } = useCheckout();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput?.(e);
  };

  const getLabel = (key: string) => key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');

  return (
    <div className={clsx('flex flex-col', className)}>
      {title && <h2 className="mt-2 text-2xl font-bold">{title}</h2>}
      {Object.entries(checkout?.shipping || {})
        .filter(([key]) => key !== 'country')
        .map(([key, value], index) => (
          <div className={index !== 0 ? 'mt-4' : ''} key={key}>
            <Input
              type="text"
              name={key}
              value={value}
              placeholder={`Insert ${getLabel(key)}`}
              isRequired={!optionalFields.includes(key)}
              size="md"
              onChange={onChange}
              label={getLabel(key)}
              isInvalid={error && !!(error as any)[key]}
              errorMessage={error && (error as any)[key]}
            />
          </div>
        ))}
      <div className="mt-4">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Country <span className="text-red-500">*</span>
        </label>
        <div>
          <Select
            className="max-w-xs"
            isRequired
            name="country"
            aria-label="Select a country"
            value={checkout?.shipping.country}
            onChange={(event) =>
              onChange({
                target: {
                  name: 'country',
                  value: event.target.value
                } as unknown as EventTarget & HTMLInputElement
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            {countries.map((item) => (
              <SelectItem
                key={item.name}
                startContent={
                  <Avatar alt={item.name + '-img'} className="h-6 w-6" src={item.icon} />
                }
              >
                {item.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
