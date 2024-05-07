'use client';

import Price from 'components/price';
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

const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

const PriceRange = ({ id, values }: { id: string; values: Filter['values'] }) => {
  const highestPrice = values.reduce(
    (acc, { value }) => Math.max(acc, get(value, 'price.max', 0)),
    0
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const priceMin = searchParams.get(`${id}.min`);
  const priceMax = searchParams.get(`${id}.max`);

  const [min, setMin] = useState(priceMin || '');
  const [max, setMax] = useState(priceMax || '');

  const debouncedMin = useDebounce(min);
  const debouncedMax = useDebounce(max);

  const minRef = useRef(min);
  const maxRef = useRef(max);

  const updateSearchParams = useCallback(
    (priceRange: { min: string; max: string }) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(`${id}.min`, priceRange.min);
      newSearchParams.set(`${id}.max`, priceRange.max);
      router.replace(createUrl(pathname, newSearchParams), { scroll: false });
    },
    [id, pathname, router, searchParams]
  );

  const handleChangeMinPrice = (value: string) => {
    setMin(value);
    minRef.current = value;
  };
  const handleChangeMaxPrice = (value: string) => {
    setMax(value);
    maxRef.current = value;
  };
  useEffect(() => {
    if (debouncedMin) {
      let _minPrice = debouncedMin;
      const minNum = Number(_minPrice);
      if (minNum < 0) {
        _minPrice = '0';
      }
      if (maxRef.current && minNum > Number(maxRef.current)) {
        _minPrice = maxRef.current;
      }
      if (minNum > highestPrice) {
        _minPrice = String(highestPrice);
      }
      if (_minPrice !== debouncedMin) {
        handleChangeMinPrice(_minPrice);
      }
      updateSearchParams({ min: _minPrice, max: maxRef.current });
    } else {
      updateSearchParams({ min: '', max: maxRef.current });
    }
  }, [debouncedMin, highestPrice, updateSearchParams]);

  useEffect(() => {
    if (debouncedMax) {
      let _maxPrice = debouncedMax;
      const maxNum = Number(_maxPrice);
      if (minRef.current && maxNum < Number(minRef.current)) {
        _maxPrice = minRef.current;
      }
      if (maxNum > highestPrice) {
        _maxPrice = String(highestPrice);
      }
      if (_maxPrice !== debouncedMax) {
        handleChangeMaxPrice(_maxPrice);
      }
      updateSearchParams({ min: minRef.current, max: _maxPrice });
    } else {
      updateSearchParams({ min: minRef.current, max: '' });
    }
  }, [debouncedMax, highestPrice, updateSearchParams]);

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
            value={min}
            onChange={(e) => handleChangeMinPrice(e.target.value)}
          />
        </div>
        <div className="flex items-center rounded border bg-white pl-3 has-[:focus]:ring-1 has-[:focus]:ring-secondary">
          <p className="text-sm text-gray-500">{currencySymbol}</p>
          <input
            className="w-28 rounded border-none text-sm focus:ring-0 focus:ring-offset-0"
            type="number"
            min={min}
            max={highestPrice}
            placeholder="To"
            value={max}
            onChange={(e) => handleChangeMaxPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
