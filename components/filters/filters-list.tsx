'use client';

import { Button } from '@headlessui/react';
import { MAKE_FILTER_ID, MODEL_FILTER_ID, PART_TYPES, YEAR_FILTER_ID } from 'lib/constants';
import { Menu, Metaobject } from 'lib/shopify/types';
import { createUrl, findParentCollection } from 'lib/utils';
import get from 'lodash.get';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { fetMetaobjects } from './actions';
import FilterField from './field';

type FiltersListProps = {
  makes: Metaobject[];
  menu: Menu[];
  autoFocusField?: string;
};

const FiltersList = ({ makes, menu, autoFocusField }: FiltersListProps) => {
  const params = useParams<{ collection?: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const parentCollection = params.collection ? findParentCollection(menu, params.collection) : null;
  // get the active collection (if any) to identify the default part type.
  // if a collection is a sub collection, we will find the parent. Normally in this case, the parent collection would either be transmissions or engines.
  const partTypeCollection = parentCollection?.path.split('/').slice(-1)[0] || params.collection;

  const [partType, setPartType] = useState<{ label: string; value: string } | null>(
    PART_TYPES.find((type) => type.value === partTypeCollection) || null
  );

  const makeIdFromSearchParams = searchParams.get(MAKE_FILTER_ID);
  const modelIdFromSearchParams = searchParams.get(MODEL_FILTER_ID);
  const yearIdFromSearchParams = searchParams.get(YEAR_FILTER_ID);

  const [models, setModels] = useState<Metaobject[]>([]);
  const [years, setYears] = useState<Metaobject[]>([]);
  const [isLoading, startTransition] = useTransition();

  const [make, setMake] = useState<Metaobject | null>(
    (partType &&
      makes.find((make) =>
        makeIdFromSearchParams
          ? make.id === makeIdFromSearchParams
          : params.collection?.includes(make.name!.toLowerCase())
      )) ||
      null
  );
  const [model, setModel] = useState<Metaobject | null>(
    models.find((model) => model.id === searchParams.get(MODEL_FILTER_ID)) || null
  );

  const [year, setYear] = useState<Metaobject | null>(
    years.find((y) => y.id === searchParams.get(YEAR_FILTER_ID)) || null
  );

  const modelOptions = make ? models.filter((m) => get(m, 'make') === make.id) : models;
  const yearOptions = model ? years.filter((y) => get(y, 'make_model') === model.id) : years;

  const disabled = !partType || !make || !model || !year;

  useEffect(() => {
    if (partType) {
      const _make = makes.find((make) =>
        makeIdFromSearchParams
          ? make.id === makeIdFromSearchParams
          : params.collection?.includes(make.name!.toLowerCase())
      );

      if (_make) {
        setMake((currentMake) => {
          if (currentMake?.id !== _make.id) {
            setModel(null);
            setYear(null);
          }
          return _make;
        });
      }
    }
  }, [makeIdFromSearchParams, makes, params.collection, partType]);

  useEffect(() => {
    if (make?.id && models.length === 0) {
      startTransition(async () => {
        const modelsResponse = await fetMetaobjects('make_model_composite');
        if (modelIdFromSearchParams) {
          setModel(
            (currentModel) =>
              modelsResponse?.find((model) => model.id === modelIdFromSearchParams) || currentModel
          );
        }
        setModels(modelsResponse || []);
      });
    }
  }, [make?.id, modelIdFromSearchParams, models.length]);

  useEffect(() => {
    if (model?.id && years.length === 0) {
      startTransition(async () => {
        const yearsResponse = await fetMetaobjects('make_model_year_composite');
        if (yearIdFromSearchParams) {
          setYear(
            (currentYear) =>
              yearsResponse?.find((year) => year.id === yearIdFromSearchParams) || currentYear
          );
        }
        setYears(yearsResponse || []);
      });
    }
  }, [model?.id, yearIdFromSearchParams, years.length]);

  const onChangeMake = async (value: Metaobject | null) => {
    setMake(value);
    setModel(null);
    setYear(null);
  };

  const onChangeModel = async (value: Metaobject | null) => {
    setModel(value);
    setYear(null);
  };

  const onChangeYear = (value: Metaobject | null) => {
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
    newSearchParams.set(MAKE_FILTER_ID, make?.id || '');
    newSearchParams.set(MODEL_FILTER_ID, model?.id || '');
    newSearchParams.set(YEAR_FILTER_ID, year?.id || '');
    router.push(createUrl(`/search/${partType?.value}`, newSearchParams), { scroll: false });
  };

  return (
    <>
      <FilterField
        label="Part Type"
        onChange={onChangePartType}
        selectedValue={partType}
        options={PART_TYPES}
        getId={(option) => option.value}
        displayKey="label"
        autoFocus={autoFocusField === 'partType'}
      />
      <FilterField
        label="Make"
        onChange={onChangeMake}
        selectedValue={make}
        options={makes}
        getId={(option) => option.id}
        disabled={!partType}
        autoFocus={autoFocusField === 'make'}
        displayKey="display_name"
      />
      <FilterField
        label="Model"
        onChange={onChangeModel}
        selectedValue={model}
        options={modelOptions}
        getId={(option) => option.id}
        disabled={!make}
        autoFocus={autoFocusField === 'model'}
        isLoading={isLoading}
      />
      <FilterField
        label="Year"
        onChange={onChangeYear}
        selectedValue={year}
        options={yearOptions}
        getId={(option) => option.id}
        disabled={!model || !make}
        autoFocus={autoFocusField === 'year'}
        isLoading={isLoading}
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
