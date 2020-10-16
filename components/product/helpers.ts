import type { Product } from '@lib/bigcommerce/api/operations/get-product'

export function getProductOptions(product: Product) {
  const options = product.options.edges?.map(({ node }: any) => ({
    displayName: node.displayName,
    values: node.values.edges?.map(({ node }: any) => node),
  }))

  return options
}
