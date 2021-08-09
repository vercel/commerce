import type { RawProduct } from '@framework/types/product'
import type { Product } from '@commerce/types/product'

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
    // TODO: Implement this
    variants: [
      {
        id: 'unique',
        options: [
          {
            id: 'unique',
            displayName: 'Model',
            values: [
              {
                label: 'Unique',
              },
            ],
          },
        ],
      },
    ],
    options: [
      {
        id: 'option-color',
        displayName: 'Color',
        values: [
          {
            label: 'color',
            hexColors: ['#222'],
          },
        ],
      },
      {
        id: 'option-size',
        displayName: 'Size',
        values: [
          {
            label: 'S',
          },
          {
            label: 'M',
          },
          {
            label: 'L',
          },
        ],
      },
    ],
  }
}
