'use server';

import {
  AVAILABILITY_FILTER_ID,
  PRICE_FILTER_ID,
  PRODUCT_METAFIELD_PREFIX,
  VARIANT_METAFIELD_PREFIX,
  defaultSort,
  sorting
} from 'lib/constants';
import { getCollectionProducts, getProducts } from 'lib/shopify';

const constructFilterInput = (filters: {
  [key: string]: string | string[] | undefined;
}): Array<object> => {
  const results = [] as Array<object>;
  Object.entries(filters)
    .filter(([key]) => !key.startsWith(PRICE_FILTER_ID))
    .forEach(([key, value]) => {
      const [namespace, metafieldKey] = key.split('.').slice(-2);
      const values = Array.isArray(value) ? value : [value];

      if (key === AVAILABILITY_FILTER_ID) {
        results.push({
          available: value === 'true'
        });
      } else if (key.startsWith(PRODUCT_METAFIELD_PREFIX)) {
        results.push(
          ...values.map((v) => ({
            productMetafield: {
              namespace,
              key: metafieldKey,
              value: v
            }
          }))
        );
      } else if (key.startsWith(VARIANT_METAFIELD_PREFIX)) {
        results.push(
          ...values.map((v) => ({
            variantMetafield: {
              namespace,
              key: metafieldKey,
              value: v
            }
          }))
        );
      }
    });

  const price = {} as { min?: number; max?: number };

  if (filters[`${PRICE_FILTER_ID}.min`]) {
    price.min = Number(filters[`${PRICE_FILTER_ID}.min`]);
  }
  if (filters[`${PRICE_FILTER_ID}.max`]) {
    price.max = Number(filters[`${PRICE_FILTER_ID}.max`]);
    !price.min && (price.min = 0);
  }
  if (price.max || price.min) {
    results.push({ price });
  }
  return results;
};

export const getProductsInCollection = async ({
  searchParams,
  afterCursor
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
  afterCursor?: string;
}) => {
  const { sort, q, collection, ...rest } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const filtersInput = constructFilterInput(rest);

  const response = await getCollectionProducts({
    collection: collection as string,
    sortKey,
    reverse,
    ...(filtersInput.length ? { filters: filtersInput } : {}),
    ...(afterCursor ? { after: afterCursor } : {})
  });

  return response;
};

export const searchProducts = async ({
  searchParams,
  afterCursor
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
  afterCursor?: string;
}) => {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const response = await getProducts({
    sortKey,
    reverse,
    query: searchValue,
    ...(afterCursor ? { after: afterCursor } : {})
  });

  return response;
};
