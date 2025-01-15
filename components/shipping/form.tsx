'use client';
import { Avatar, Input, Select, SelectItem } from '@nextui-org/react';
import clsx from 'clsx';
import { getCountries } from 'lib/utils';
import { Billing } from 'lib/woocomerce/models/billing';
import { useState } from 'react';

const optionalFields = ['company'];

export default function ShippingForm({
  className,
  title,
  handleChangeAction
}: {
  className?: string;
  title?: string;
  handleChangeAction?: (data: Billing) => void;
}) {
  const countries = getCountries();
  const initialState: Billing = {
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    company: '',
    phone: '',
    email: ''
  };

  const [formData, setFormData] = useState(initialState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    if (handleChangeAction) {
      handleChangeAction(newData);
    }
  };

  const getLabel = (key: string) => key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');

  return (
    <div className={clsx('flex flex-col', className)}>
      {title && <h2 className="mt-2 text-2xl font-bold">{title}</h2>}
      {Object.entries(formData)
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
            value={formData.country}
            onChange={(event) =>
              onChange({
                target: {
                  name: 'country',
                  value: event.target.value,
                } as unknown as EventTarget & HTMLInputElement,
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
