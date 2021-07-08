import { cartQueryFragment } from '@framework/utils/queries/get-cart-query'

const accountCartByAccountIdQuery = `
  query accountCartByAccountIdQuery($accountId: ID!, $shopId: ID!, $itemsAfterCursor: ConnectionCursor) {
    cart: accountCartByAccountId(accountId: $accountId, shopId: $shopId) {
      ${cartQueryFragment}
    }
  }
`

export default accountCartByAccountIdQuery
