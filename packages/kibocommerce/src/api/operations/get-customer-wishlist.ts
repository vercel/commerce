import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { GetCustomerWishlistOperation } from '@vercel/commerce/types/wishlist'
// import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import { KiboCommerceConfig } from '..'
// import getAllProducts, { ProductEdge } from './get-all-products'
import { getCustomerWishlistQuery } from '../queries/get-customer-wishlist-query'

export default function getCustomerWishlistOperation({
  commerce,
}: OperationContext<any>) {
  async function getCustomerWishlist<
    T extends GetCustomerWishlistOperation
  >(opts: {
    variables: T['variables']
    config?: KiboCommerceConfig
    includeProducts?: boolean
  }): Promise<T['data']>

  async function getCustomerWishlist<T extends GetCustomerWishlistOperation>(
    opts: {
      variables: T['variables']
      config?: KiboCommerceConfig
      includeProducts?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getCustomerWishlist<T extends GetCustomerWishlistOperation>({
    config,
    variables,
    includeProducts,
  }: {
    url?: string
    variables: T['variables']
    config?: KiboCommerceConfig
    includeProducts?: boolean
  }): Promise<T['data']> {
    let customerWishlist = {}
    try {
      config = commerce.getConfig(config)
      const result = await config?.fetch(getCustomerWishlistQuery, {
        variables,
      })
      customerWishlist = result?.data?.customerWishlist
    } catch (e) {
      customerWishlist = {}
    }

    return { wishlist: customerWishlist as any }
  }

  return getCustomerWishlist
}
