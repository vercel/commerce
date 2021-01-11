import { Product as BCProduct } from '@framework/schema'

export function normalizeProduct(productNode: BCProduct): Product {
  const {
    entityId: id,
    images,
    variants,
    productOptions,
    prices,
    path,
    options: _,
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
    options: productOptions.edges
      ? productOptions.edges.map(
          ({
            node: {
              entityId,
              values: { edges },
              ...rest
            },
          }: any) => ({
            id: entityId,
            values: edges.map(({ node }: any) => node),
            ...rest,
          })
        )
      : [],
    price: {
      value: prices?.price.value,
      currencyCode: prices?.price.currencyCode,
    },
    ...rest,
  }
}
