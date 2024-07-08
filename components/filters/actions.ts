'use server';

import { getAllMetaobjects } from 'lib/shopify';
import get from 'lodash.get';
import { cache } from 'react';

export const fetchModels = cache(async () => {
  try {
    const data = await getAllMetaobjects('make_model_composite');

    return data.toSorted((a, b) => {
      const modelA = get(a, 'name').toLowerCase();
      const modelB = get(b, 'name').toLowerCase();
      return modelA.localeCompare(modelB);
    });
  } catch (error) {
    console.log('fetchModels action', error);
  }
});

export const fetchYears = cache(async () => {
  try {
    const data = await getAllMetaobjects('make_model_year_composite');

    return data.toSorted((a, b) => {
      const yearA = parseInt(get(a, 'name'), 10);
      const yearB = parseInt(get(b, 'name'), 10);
      return yearB - yearA; // Descending order for years
    });
  } catch (error) {
    console.log('fetchYears action', error);
  }
});

export const fetchMakes = cache(async () => {
  try {
    const data = await getAllMetaobjects('make');

    return data.toSorted((a, b) => {
      const makeA = get(a, 'display_name').toLowerCase();
      const makeB = get(b, 'display_name').toLowerCase();
      return makeA.localeCompare(makeB);
    });
  } catch (error) {
    console.log('fetchMakes action', error);
  }
});
