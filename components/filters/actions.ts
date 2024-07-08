'use server';

import { getAllMetaobjects } from 'lib/shopify';
import { Metaobject } from 'lib/shopify/types';
import get from 'lodash.get';
import { cache } from 'react';

export const fetMetaobjects = async (
  type: string,
  // eslint-disable-next-line no-unused-vars
  sortFn?: (a: Metaobject, b: Metaobject) => number
) => {
  try {
    const data = await getAllMetaobjects(type);

    return sortFn ? data.toSorted(sortFn) : data;
  } catch (error) {
    console.log('fetMetaobjects action', error);
  }
};

const sortModelsFn = (a: Metaobject, b: Metaobject) => {
  const modelA = get(a, 'name').toLowerCase();
  const modelB = get(b, 'name').toLowerCase();
  return modelA.localeCompare(modelB);
};

const sortYearsFn = (a: Metaobject, b: Metaobject) => {
  const yearA = parseInt(get(a, 'name'), 10);
  const yearB = parseInt(get(b, 'name'), 10);
  return yearB - yearA; // Descending order for years
};

const sortMakesFn = (a: Metaobject, b: Metaobject) => {
  const makeA = get(a, 'display_name').toLowerCase();
  const makeB = get(b, 'display_name').toLowerCase();
  return makeA.localeCompare(makeB);
};

export const fetchModels = cache(() => fetMetaobjects('make_model_composite', sortModelsFn));
export const fetchYears = cache(() => fetMetaobjects('make_model_year_composite', sortYearsFn));

export const fetchMakes = cache(() => fetMetaobjects('make', sortMakesFn));
