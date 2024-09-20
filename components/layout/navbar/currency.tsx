'use client';

import { useState } from "react";

const Currencies = [
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'JPY',
];

export function CurrencySelector({ currency }: { currency: string; }) {
  const selectedCurrency = currency;
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (currency: string) => {
    // navigate to the current page with the new currency as query param
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('currency', currency);
    window.history.pushState({}, '', `${window.location.pathname}?${newParams}`);
    window.location.reload();

    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex h-11 justify-center items-center w-full rounded-md border border-neutral-200 px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCurrency}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {Currencies.map((currency) => (
              <button
                key={currency}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleSelect(currency)}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
