import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { GetCustomerWishlistOperation } from '@vercel/commerce/types/wishlist'
import type { RecursivePartial, BCWishlist } from '../utils/types'
import { BigcommerceConfig, Provider } from '..'
import { ProductEdge } from './get-all-products'
import { normalizeWishlist } from '../../lib/normalize'

export default function getCustomerWishlistOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getCustomerWishlist<
    T extends GetCustomerWishlistOperation
  >(opts: {
    variables: T['variables']
    config?: BigcommerceConfig
    includeProducts?: boolean
  }): Promise<T['data']>

  async function getCustomerWishlist<T extends GetCustomerWishlistOperation>(
    opts: {
      variables: T['variables']
      config?: BigcommerceConfig
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
    config?: BigcommerceConfig
    includeProducts?: boolean
  }): Promise<T['data']> {
    config = commerce.getConfig(config)

    const { data = [] } = await config.storeApiFetch<{ data: BCWishlist[] }>(
      `/v3/wishlists?customer_id=${variables.customerId}`
    )

    const wishlist = data[0]

    if (includeProducts && wishlist?.items?.length) {
      const ids = []

      for (const wishlistItem of wishlist.items) {
        if (wishlistItem.product_id) {
          ids.push(String(wishlistItem.product_id))
        }
      }

      if (ids.length) {
        const graphqlData = await commerce.getAllProducts({
          variables: { first: 50, ids },
          config,
        })
        // Put the products in an object that we can use to get them by id
        const productsById = graphqlData.products.reduce<{
          [k: number]: ProductEdge
        }>((prods, p) => {
          prods[Number(p.id)] = p as any
          return prods
        }, {})
        // Populate the wishlist items with the graphql products
        wishlist.items.forEach((item) => {
          const product = item && productsById[Number(item.product_id)]
          if (item && product) {
            // @ts-ignore Fix this type when the wishlist type is properly defined
            item.product = product
          }
        })
      }
    }

    return { wishlist: wishlist && normalizeWishlist(wishlist) }
  }

  return getCustomerWishlist
}
