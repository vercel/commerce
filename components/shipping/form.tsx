'use client';
import { Shipping } from 'lib/woocomerce/models/shipping';
import { useState } from 'react';

export default function ShippingForm({
  title,
  handleChangeAction
}: {
  title: string;
  handleChangeAction?: (data: Shipping) => void;
}) {
  const initialState: Shipping = {
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    company: ''
  };

  const [formData, setFormData] = useState(initialState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    if (handleChangeAction) {
      handleChangeAction(newData);
    }
  };

  return (
    <div className="flex flex-col justify-between overflow-hidden p-1">
      <form className="flex flex-col gap-4">
        <h2 className="mt-2 text-2xl font-bold">{title}</h2>
        <div className="mt-4">
          <label
            htmlFor="address_1"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Address
          </label>
          <input
            type="text"
            name="address_1"
            value={formData.address_1}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-3 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-3 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-3 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="postcode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Postcode
          </label>
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-3 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-3 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          />
        </div>
      </form>
    </div>
  );
}
