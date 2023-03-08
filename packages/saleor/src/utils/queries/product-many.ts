import * as fragment from '../fragments'

export const ProductMany = /* GraphQL */ `
  query ProductMany(
    $first: Int = 50
    $filter: ProductFilterInput
    $sortBy: ProductOrder
    $channel: String = "default-channel"
  ) {
    products(
      first: $first
      channel: $channel
      filter: $filter
      sortBy: $sortBy
    ) {
      ...ProductConnection
    }
  }
  ${fragment.ProductConnection}
`
