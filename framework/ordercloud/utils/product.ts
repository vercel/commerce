import type { RawProductWithPrice } from '@framework/types/product'
import type { Product } from '@commerce/types/product'

export function normalize(product: RawProductWithPrice): Product {
  return {
    id: product.ID,
    name: product.Name,
    description: product.Description,
    images: [],
    variants: [],
    price: {
      value: product.priceSchedule.PriceBreaks[0].Price,
      currencyCode: 'USD',
    },
    options: [],
  }
}
