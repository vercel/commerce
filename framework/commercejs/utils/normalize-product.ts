import type { Product } from '@commerce/types/product'
import type { Product as CommercejsProduct } from '@chec/commerce.js/types/product'

export function normalizeProduct(
  commercejsProduct: CommercejsProduct
): Product {
  const { id, name, description, permalink, assets, price } = commercejsProduct
  return {
    id,
    name,
    description,
    descriptionHtml: description,
    slug: permalink,
    images: assets.map(({ url, description, filename }) => ({
      url,
      alt: description || filename,
    })),
    price: {
      value: price.raw,
      currencyCode: 'USD',
    },
    variants: [],
    options: [],
  }
}
