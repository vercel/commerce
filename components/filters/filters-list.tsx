'use client';

import { Button } from '@headlessui/react';
import { MAKE_FILTER_ID, MODEL_FILTER_ID, PART_TYPES, YEAR_FILTER_ID } from 'lib/constants';
import { Menu, Metaobject, PageInfo } from 'lib/shopify/types';
import { createUrl, findParentCollection } from 'lib/utils';
import get from 'lodash.get';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { fetchMetaobjectReferences } from './actions';
import FilterField from './field';

type Options = {
  options: Metaobject[];
  pageInfo: PageInfo | null;
};
type FiltersListProps = {
  makes?: Metaobject[];
  menu: Menu[];
  autoFocusField?: string;
};

const sortYears = (years: Metaobject[]) => {
  return years.toSorted((a, b) => {
    const yearA = parseInt(get(a, 'name'), 10);
    const yearB = parseInt(get(b, 'name'), 10);
    return yearB - yearA; // Descending order for years
  });
};

const sortOptions = (options: Metaobject[], displayField: string) => {
  return options.toSorted((a, b) => {
    const modelA = get(a, displayField).toLowerCase();
    const modelB = get(b, displayField).toLowerCase();
    return modelA.localeCompare(modelB);
  });
};
const FiltersList = ({ makes = [], menu, autoFocusField }: FiltersListProps) => {
  const params = useParams<{ collection?: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const makeIdFromSearchParams = searchParams.get(MAKE_FILTER_ID);
  // const modelIdFromSearchParams = searchParams.get(MODEL_FILTER_ID);
  // const yearIdFromSearchParams = searchParams.get(YEAR_FILTER_ID);

  const parentCollection = params.collection ? findParentCollection(menu, params.collection) : null;
  // get the active collection (if any) to identify the default part type.
  // if a collection is a sub collection, we will find the parent. Normally in this case, the parent collection would either be transmissions or engines.
  const partTypeCollection = parentCollection?.path.split('/').slice(-1)[0] || params.collection;
  const [partType, setPartType] = useState<{ label: string; value: string } | null>(
    PART_TYPES.find(
      (type) =>
        type.value === partTypeCollection ||
        (partTypeCollection && partTypeCollection.includes(type.value))
    ) || null
  );
  const [make, setMake] = useState<Metaobject | null>(null);
  const [model, setModel] = useState<Metaobject | null>(null);
  const [year, setYear] = useState<Metaobject | null>(null);

  const [models, setModels] = useState<Options>({ options: [], pageInfo: null });
  const [years, setYears] = useState<Options>({ options: [], pageInfo: null });

  const [loadingAttribute, setLoadingAttribute] = useState<'models' | 'years'>();

  const disabled = !partType || !make || !model || !year;
  const [, initialMake] = params.collection?.split('_') || [];

  const handleFetchModels = useCallback(
    async (params: { makeId?: string; reset?: boolean; after?: string }) => {
      const { makeId, reset, after } = params;
      setLoadingAttribute('models');
      const modelsResponse = await fetchMetaobjectReferences(makeId, after);

      setModels((models) => {
        if (reset) {
          return {
            options: modelsResponse?.references || [],
            pageInfo: modelsResponse?.pageInfo || null
          };
        }

        return {
          options: models.options.concat(modelsResponse?.references || []),
          pageInfo: modelsResponse?.pageInfo || models.pageInfo
        };
      });
      setLoadingAttribute(undefined);
    },
    []
  );

  const handleFetchYears = useCallback(
    async (params: { modelId?: string; after?: string; reset?: boolean }) => {
      const { modelId, after, reset } = params;
      setLoadingAttribute('years');
      const yearsResponse = await fetchMetaobjectReferences(modelId, after);

      setYears((years) => {
        if (reset) {
          return {
            options: yearsResponse?.references || [],
            pageInfo: yearsResponse?.pageInfo || null
          };
        }

        return {
          options: years.options.concat(yearsResponse?.references || []),
          pageInfo: yearsResponse?.pageInfo || years.pageInfo
        };
      });
      setLoadingAttribute(undefined);
    },
    []
  );

  useEffect(() => {
    if (partType) {
      const _make = makes.find((make) =>
        makeIdFromSearchParams
          ? make.id === makeIdFromSearchParams
          : initialMake === make.name!.toLowerCase()
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
  }, [initialMake, makeIdFromSearchParams, makes, partType]);

  useEffect(() => {
    if (make?.id) {
      handleFetchModels({ makeId: make?.id, reset: true });
    }
  }, [make?.id, handleFetchModels]);

  useEffect(() => {
    if (model?.id) {
      handleFetchYears({ modelId: model?.id, reset: true });
    }
  }, [handleFetchYears, model?.id]);

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

  const handleLoadMoreModels = (reset?: boolean) => {
    return handleFetchModels({ makeId: make?.id, after: models.pageInfo?.endCursor, reset });
  };

  const handleLoadMoreYears = (reset?: boolean) => {
    return handleFetchYears({ modelId: model?.id, after: years.pageInfo?.endCursor, reset });
  };

  const sortedyear = sortYears(years.options);
  const sortedModels = sortOptions(models.options, 'name');

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
        options={sortedModels}
        getId={(option) => option.id}
        disabled={!make}
        autoFocus={autoFocusField === 'model'}
        isLoading={loadingAttribute === 'models'}
        loadMore={handleLoadMoreModels}
        hasNextPage={models.pageInfo?.hasNextPage}
      />
      <FilterField
        label="Year"
        onChange={onChangeYear}
        selectedValue={year}
        options={sortedyear}
        getId={(option) => option.id}
        disabled={!model || !make}
        autoFocus={autoFocusField === 'year'}
        isLoading={loadingAttribute === 'years'}
        loadMore={handleLoadMoreYears}
        hasNextPage={years.pageInfo?.hasNextPage}
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
