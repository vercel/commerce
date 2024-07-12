'use client';

import { Button } from '@headlessui/react';
import { YEAR_FILTER_ID } from 'lib/constants';
import { Menu } from 'lib/shopify/types';
import { createUrl, findParentCollection } from 'lib/utils';
import { FilterOption } from 'lib/vercel-kv/types';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import FilterField from './field';

const toShopifyId = (id: string) => `gid://shopify/Metaobject/${id}`;

type FiltersListProps = {
  makes: FilterOption[];
  models: FilterOption[];
  years: FilterOption[];
  partTypes: FilterOption[];
  menu: Menu[];
  autoFocusField?: string;
};

const FiltersList = ({
  makes,
  models,
  years,
  menu,
  autoFocusField,
  partTypes
}: FiltersListProps) => {
  const params = useParams<{ collection?: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const yearIdFromSearchParams = searchParams.get(YEAR_FILTER_ID);

  const parentCollection = params.collection ? findParentCollection(menu, params.collection) : null;
  // get the active collection (if any) to identify the default part type.
  // if a collection is a sub collection, we will find the parent. Normally in this case, the parent collection would either be transmissions or engines.
  const partTypeCollection = parentCollection?.path.split('/').slice(-1)[0] || params.collection;
  const [partType, setPartType] = useState<{ label: string; value: string } | null>(
    partTypes.find(
      (type) =>
        type.value === partTypeCollection ||
        (partTypeCollection && partTypeCollection.includes(type.value))
    ) || null
  );

  const [make, setMake] = useState<FilterOption | null>(null);
  const [model, setModel] = useState<FilterOption | null>(null);
  const [year, setYear] = useState<FilterOption | null>(null);

  useEffect(() => {
    const selectedYear = years.find((year) => toShopifyId(year.value) === yearIdFromSearchParams);
    const [partType, make, model] = selectedYear?.parent?.split('_') || [];

    setPartType(partTypes.find((type) => type.label === partType) || null);
    setMake(makes.find((makeOption) => makeOption.label === make) || null);
    setModel(models.find((modelOption) => modelOption.label === model) || null);
    setYear(selectedYear || null);
  }, [makes, models, partTypes, yearIdFromSearchParams, years]);

  const disabled = !partType || !make || !model || !year;

  const onChangeMake = async (value: FilterOption | null) => {
    setMake(value);
    setModel(null);
    setYear(null);
  };

  const onChangeModel = async (value: FilterOption | null) => {
    setModel(value);
    setYear(null);
  };

  const onChangeYear = (value: FilterOption | null) => {
    setYear(value);
  };

  const onChangePartType = (value: { label: string; value: string } | null) => {
    setPartType(value);
    setMake(null);
    setModel(null);
    setYear(null);
  };

  const onSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(YEAR_FILTER_ID, year?.value ? toShopifyId(year.value) : '');

    router.push(createUrl(`/search/${partType?.value}`, newSearchParams), { scroll: false });
  };

  console.log({ partType, makes });
  const makeOptions = makes.filter((make) => make.parent === partType?.label);
  const modelsOptions = models.filter(
    (model) => model.parent === `${partType?.label}_${make?.label}`
  );

  const yearsOptions = years.filter(
    (year) => year.parent === `${partType?.label}_${make?.label}_${model?.label}`
  );

  return (
    <>
      <FilterField
        label="Part Type"
        onChange={onChangePartType}
        selectedValue={partType}
        options={partTypes}
        getId={(option) => option.value}
        displayKey="label"
        autoFocus={autoFocusField === 'partType'}
      />
      <FilterField
        label="Make"
        onChange={onChangeMake}
        selectedValue={make}
        options={makeOptions}
        getId={(option) => option.value}
        disabled={!partType}
        autoFocus={autoFocusField === 'make'}
        displayKey="label"
      />
      <FilterField
        label="Model"
        onChange={onChangeModel}
        selectedValue={model}
        options={modelsOptions}
        getId={(option) => option.value}
        disabled={!make}
        autoFocus={autoFocusField === 'model'}
        displayKey="label"
      />
      <FilterField
        label="Year"
        onChange={onChangeYear}
        selectedValue={year}
        options={yearsOptions}
        getId={(option) => option.value}
        disabled={!model || !make}
        autoFocus={autoFocusField === 'year'}
        displayKey="label"
      />
      <Button
        onClick={onSearch}
        disabled={disabled}
        className="w-full rounded bg-secondary px-4 py-1.5 text-sm font-medium text-white data-[disabled]:cursor-not-allowed data-[hover]:bg-secondary/85 data-[disabled]:opacity-50 @md:w-auto"
      >
        Search
      </Button>
    </>
  );
};

export default FiltersList;
