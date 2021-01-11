import { Product as BCProduct } from '@framework/schema'

export function normalizeProduct(productNode: BCProduct): Product {
  const {
    entityId: id,
    images,
    variants,
    productOptions,
    prices,
    path,
    ...rest
  } = productNode

  return {
    path,
    slug: path?.replace(/^\/+|\/+$/g, ''),
    images: images.edges
      ? images.edges.map(
          ({ node: { urlOriginal, altText, ...rest } }: any) => ({
            url: urlOriginal,
            alt: altText,
            ...rest,
          })
        )
      : [],
    variants: variants.edges
      ? variants.edges.map(({ node: { entityId, ...rest } }: any) => ({
          id: entityId,
          ...rest,
        }))
      : [],
    productOptions: productOptions.edges
      ? productOptions.edges.map(({ node }: any) => node)
      : [],
    price: {
      value: prices?.price.value,
      currencyCode: prices?.price.currencyCode,
    },
    ...rest,
  }
}
