import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type {
  GetCustomerWishlistOperation,
  Wishlist,
  WishlistItem,
} from '@vercel/commerce/types/wishlist'
import type { RecursivePartial } from '../utils/types'
import { BigcommerceConfig, Provider } from '..'

import type { Product } from '@vercel/commerce/types/product'

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

    const { data = [] } = await config.storeApiFetch<
      RecursivePartial<{ data: Wishlist[] }>
    >(`/v3/wishlists?customer_id=${variables.customerId}`)

    const wishlist = data[0]

    if (!wishlist) {
      return {}
    }

    const items: WishlistItem[] = []

    if (includeProducts && wishlist?.items?.length) {
      const ids = wishlist.items
        ?.map((item) => (item?.productId ? String(item?.productId) : null))
        .filter((id): id is string => !!id)

      if (ids?.length) {
        const graphqlData = await commerce.getAllProducts({
          variables: { first: 50, ids },
          config,
        })

        // Put the products in an object that we can use to get them by id
        const productsById = graphqlData.products.reduce<{
          [k: number]: Product
        }>((prods, p) => {
          prods[Number(p.id)] = p as any
          return prods
        }, {})

        // Populate the wishlist items with the graphql products
        wishlist.items.forEach((item) => {
          const product = item && productsById[Number(item.productId)]
          if (item && product) {
            items.push({
              id: String(item.id),
              productId: String(item.productId),
              variantId: String(item.variantId),
              product,
            })
          }
        })
      }
    }

    return {
      wishlist: {
        id: String(wishlist.id),
        items,
      },
    }
  }

  return getCustomerWishlist
}
