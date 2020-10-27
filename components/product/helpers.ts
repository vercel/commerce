import type { ProductNode } from '@bigcommerce/storefront-data-hooks/dist/api/operations/get-product'

export function getProductOptions(product: ProductNode) {
  const options = product.productOptions.edges?.map(({ node }: any) => ({
    displayName: node.displayName.toLowerCase(),
    values: node.values.edges?.map(({ node }: any) => node),
  }))

  return options
}
