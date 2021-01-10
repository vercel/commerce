import { ProductNode } from '@framework/api/operations/get-all-products'

export function normalizeProduct(productNode: ProductNode | any): Product {
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
    id,
    path,
    slug: path.slice(1, -1),
    images: images.edges?.map(
      ({ node: { urlOriginal, altText, ...rest } }: any) => ({
        url: urlOriginal,
        alt: altText,
        ...rest,
      })
    ),
    variants: variants?.edges?.map(({ node }: any) => node),
    productOptions: productOptions?.edges?.map(({ node }: any) => node),
    price: {
      value: prices?.price.value,
      currencyCode: prices?.price.currencyCode,
    },
    ...rest,
  }
}
