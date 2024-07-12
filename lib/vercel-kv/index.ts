'use server';

import { kv } from '@vercel/kv';
import { MMYFilterResponse } from './types';

const { STORE_PREFIX } = process.env;

const KEY_MAP: { [key: string]: string } = {
  'car-part-planet': 'cpp',
  'reman-engine': 're',
  'reman-transmission': 'rt',
  'transmission-locator': 'tl',
  'engine-locator': 'el'
};

const storeCode = KEY_MAP[STORE_PREFIX!];

const keys = [
  `${storeCode}.partTypes`,
  `${storeCode}.makes`,
  `${storeCode}.models`,
  `${storeCode}.years`
];

export const getMMYFilters = async (): Promise<MMYFilterResponse> => {
  try {
    const [partTypes, makes, models, years] = await Promise.all(keys.map((key) => kv.get(key)));

    return { partTypes, makes, models, years } as MMYFilterResponse;
  } catch (error) {
    console.log('Error fetching MMY filters: ', error);

    return { partTypes: [], makes: [], models: [], years: [] };
  }
};
