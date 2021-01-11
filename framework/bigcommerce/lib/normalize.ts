import { Product as BCProduct } from '@framework/schema'

function productOptionNormalize({
  node: {
    entityId,
    values: { edges },
    ...rest
  },
}: any) {
  return {
    id: entityId,
    values: edges.map(({ node }: any) => node),
    ...rest,
  }
}

export function normalizeProduct(productNode: BCProduct): Product {
  const {
    entityId: id,
    images,
    variants,
    productOptions,
    prices,
    path,
    id: _,
    options: _0,
    brand,
    ...rest
  } = productNode

  return {
    id,
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
      ? variants.edges.map(
          ({ node: { entityId, productOptions, ...rest } }: any) => ({
            id: entityId,
            options: productOptions.edges.map(productOptionNormalize),
            ...rest,
          })
        )
      : [],
    options: productOptions.edges
      ? productOptions.edges.map(productOptionNormalize)
      : [],
    brand: {
      id: brand?.entityId,
      ...brand,
    },
    price: {
      value: prices?.price.value,
      currencyCode: prices?.price.currencyCode,
    },
    ...rest,
  }
}
