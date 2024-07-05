'use server';

import { getAllMetaobjects } from 'lib/shopify';

export const fetMetaobjects = async (type: string) => {
  try {
    const data = await getAllMetaobjects(type);
    return data;
  } catch (error) {
    console.log('fetMetaobjects action', error);
  }
};
