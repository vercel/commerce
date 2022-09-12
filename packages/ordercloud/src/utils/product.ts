import type { Product } from '@vercel/commerce/types/product'

import type { RawProduct } from '../types/product'

export function normalize(product: RawProduct): Product {
  return {
    id: product.ID,
    name: product.Name,
    description: product.Description,
    slug: product.ID,
    path: `/${product.ID}`,
    images: product.xp.Images,
    price: {
      value: product.xp.Price,
      currencyCode: product.xp.PriceCurrency,
    },
    variants: product.xp.Variants?.length
      ? product.xp.Variants.map((variant) => ({
          id: variant.ID,
          sku: variant.ID,
          name: product.Name,
          options: variant.Specs.map((spec) => ({
            id: spec.SpecID,
            __typename: 'MultipleChoiceOption',
            displayName: spec.Name,
            values: [
              {
                label: spec.Value,
              },
            ],
          })),
        }))
      : [],
    options: product.xp.Specs?.length
      ? product.xp.Specs.map((spec) => ({
          id: spec.ID,
          displayName: spec.Name,
          values: spec.Options.map((option) => ({
            label: option.Value,
            ...(option.xp?.hexColor && { hexColors: [option.xp.hexColor] }),
          })),
        }))
      : [],
  }
}
