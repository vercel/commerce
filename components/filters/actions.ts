'use server';

import { getAllMetaobjects, getMetaobjectReferences } from 'lib/shopify';
import get from 'lodash.get';
import { cache } from 'react';

export const fetchMetaobjectReferences = cache(async (id?: string, after?: string) => {
  if (!id) {
    return null;
  }
  try {
    const data = await getMetaobjectReferences(id, after);
    return data;
  } catch (error) {
    console.log('fetchMetaobjectReferences action', error);
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
