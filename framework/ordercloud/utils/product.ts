import type { Product } from '@commerce/types/product'

import type { RawProduct } from '../types/product'

export function normalize(product: RawProduct): Product {
  return {
    id: product.ID,
    name: product.Name,
    description: product.Description,
    slug: product.ID,
    images: product.xp.Images,
    price: {
      value: product.xp.Price,
      currencyCode: product.xp.PriceCurrency,
    },
    // Variants are not always present, in case they are not, return a single unique variant
    variants:
      product.VariantCount === 0
        ? [
            {
              id: 'unique',
              options: [
                {
                  id: 'unique',
                  displayName: 'Unique',
                  values: [{ label: 'Unique' }],
                },
              ],
            },
          ]
        : [],
    // Facets are not always present, just iterate them if they are
    options: product.xp.Facets
      ? Object.entries(product.xp.Facets).map(([key, values]) => ({
          id: key,
          displayName: key,
          __typename: 'MultipleChoiceOption',
          values: values.map((value) => ({
            label: value,
          })),
        }))
      : [],
  }
}
