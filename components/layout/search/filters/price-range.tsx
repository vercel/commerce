'use client';

import Price from 'components/price';
import { useDebounce } from 'hooks';
import { Filter } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import get from 'lodash.get';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const currencySymbol =
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol'
  })
    .formatToParts(1)
    .find((part) => part.type === 'currency')?.value || '$';

const PriceRange = ({ id, values }: { id: string; values: Filter['values'] }) => {
  const highestPrice = values.reduce(
    (acc, { value }) => Math.max(acc, get(value, 'price.max', 0)),
    0
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initialPriceMin = searchParams.get(`${id}.min`);
  const initialPriceMax = searchParams.get(`${id}.max`);

  const [minPrice, setMinPrice] = useState(initialPriceMin || '');
  const [maxPrice, setMaxPrice] = useState(initialPriceMax || '');

  const debouncedMinPrice = useDebounce(minPrice);
  const debouncedMaxPrice = useDebounce(maxPrice);

  const minPriceRef = useRef(minPrice);
  const maxPriceRef = useRef(maxPrice);

  const updateSearchParams = useCallback(
    (priceRange: { min: string; max: string }) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (!priceRange.min) {
        newSearchParams.delete(`${id}.min`);
      } else {
        newSearchParams.set(`${id}.min`, priceRange.min);
      }
      if (!priceRange.max) {
        newSearchParams.delete(`${id}.max`);
      } else {
        newSearchParams.set(`${id}.max`, priceRange.max);
      }
      router.replace(createUrl(pathname, newSearchParams), { scroll: false });
    },
    [id, pathname, router, searchParams]
  );

  const handleChangeMinPrice = (value: string) => {
    setMinPrice(value);
    minPriceRef.current = value;
  };
  const handleChangeMaxPrice = (value: string) => {
    setMaxPrice(value);
    maxPriceRef.current = value;
  };

  useEffect(() => {
    if (debouncedMinPrice) {
      let _minPrice = debouncedMinPrice;
      const minNum = Number(_minPrice);
      if (minNum < 0) {
        _minPrice = '0';
      }
      if (maxPriceRef.current && minNum > Number(maxPriceRef.current)) {
        _minPrice = maxPriceRef.current;
      }
      if (minNum > highestPrice) {
        _minPrice = String(highestPrice);
      }
      if (_minPrice !== debouncedMinPrice) {
        handleChangeMinPrice(_minPrice);
      }
      updateSearchParams({ min: _minPrice, max: maxPriceRef.current });
    } else {
      updateSearchParams({ min: '', max: maxPriceRef.current });
    }
  }, [debouncedMinPrice, highestPrice, updateSearchParams]);

  useEffect(() => {
    if (debouncedMaxPrice) {
      let _maxPrice = debouncedMaxPrice;
      const maxNum = Number(_maxPrice);
      if (minPriceRef.current && maxNum < Number(minPriceRef.current)) {
        _maxPrice = minPriceRef.current;
      }
      if (maxNum > highestPrice) {
        _maxPrice = String(highestPrice);
      }
      if (_maxPrice !== debouncedMaxPrice) {
        handleChangeMaxPrice(_maxPrice);
      }
      updateSearchParams({ min: minPriceRef.current, max: _maxPrice });
    } else {
      updateSearchParams({ min: minPriceRef.current, max: '' });
    }
  }, [debouncedMaxPrice, highestPrice, updateSearchParams]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 text-sm text-gray-500">
        The highest price is <Price amount={String(highestPrice)} currencyCode="USD" />
      </div>
      <div className="mt-3 flex max-w-full items-center gap-3">
        <div className="flex items-center rounded border bg-white pl-3 has-[:focus]:ring-1 has-[:focus]:ring-secondary">
          <p className="text-sm text-gray-500">{currencySymbol}</p>
          <input
            className="w-28 rounded border-none text-sm focus:ring-0 focus:ring-offset-0"
            type="number"
            min={0}
            max={highestPrice}
            placeholder="From"
            value={minPrice}
            onChange={(e) => handleChangeMinPrice(e.target.value)}
          />
        </div>
        <div className="flex items-center rounded border bg-white pl-3 has-[:focus]:ring-1 has-[:focus]:ring-secondary">
          <p className="text-sm text-gray-500">{currencySymbol}</p>
          <input
            className="w-28 rounded border-none text-sm focus:ring-0 focus:ring-offset-0"
            type="number"
            min={minPrice}
            max={highestPrice}
            placeholder="To"
            value={maxPrice}
            onChange={(e) => handleChangeMaxPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
