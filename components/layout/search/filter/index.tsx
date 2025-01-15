'use client';
import { Slider } from '@nextui-org/react';
import { SortFilterItem } from 'lib/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sliderValue, setSliderValue] = useState<number | number[]>(
    searchParams.get('minPrice')
      ? [Number(searchParams.get('minPrice')), Number(searchParams.get('maxPrice'))]
      : [0, 120]
  );

  const addQuerySlider = (value: number | number[]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (Array.isArray(value)) {
      newParams.set('minPrice', String(value[0]));
      newParams.set('maxPrice', String(value[1]));
    }
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
      <Slider
        className="mt-3 max-w-md"
        defaultValue={[40, 120]}
        formatOptions={{ style: 'currency', currency: 'EUR' }}
        label="Price Range"
        maxValue={150}
        minValue={0}
        value={sliderValue}
        step={10}
        onChange={setSliderValue}
        onChangeEnd={addQuerySlider}
      />
    </>
  );
}

export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <>
      <nav>
        {title ? (
          <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
            {title}
          </h3>
        ) : null}
        <ul className="hidden md:block">
          <Suspense fallback={null}>
            <FilterItemList list={list} />
          </Suspense>
        </ul>
        <ul className="md:hidden">
          <Suspense fallback={null}>
            <FilterItemDropdown list={list} />
          </Suspense>
        </ul>
      </nav>
    </>
  );
}
