import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import { definitions } from '../definitions/wishlist'
import { BigcommerceConfig, getConfig } from '..'
import getAllProducts, { ProductEdge } from './get-all-products'

export type Wishlist = Omit<definitions['wishlist_Full'], 'items'> & {
  items?: WishlistItem[]
}

export type WishlistItem = NonNullable<
  definitions['wishlist_Full']['items']
>[0] & {
  product?: ProductEdge['node']
}

export type GetCustomerWishlistResult<
  T extends { wishlist?: any } = { wishlist?: Wishlist }
> = T

export type GetCustomerWishlistVariables = {
  customerId: number
}

async function getCustomerWishlist(opts: {
  variables: GetCustomerWishlistVariables
  config?: BigcommerceConfig
  includeProducts?: boolean
}): Promise<GetCustomerWishlistResult>

async function getCustomerWishlist<
  T extends { wishlist?: any },
  V = any
>(opts: {
  url: string
  variables: V
  config?: BigcommerceConfig
  includeProducts?: boolean
}): Promise<GetCustomerWishlistResult<T>>

async function getCustomerWishlist({
  config,
  variables,
  includeProducts,
}: {
  url?: string
  variables: GetCustomerWishlistVariables
  config?: BigcommerceConfig
  includeProducts?: boolean
}): Promise<GetCustomerWishlistResult> {
  config = getConfig(config)

  const { data = [] } = await config.storeApiFetch<
    RecursivePartial<{ data: Wishlist[] }>
  >(`/v3/wishlists?customer_id=${variables.customerId}`)
  const wishlist = data[0]

  if (includeProducts && wishlist?.items?.length) {
    const entityIds = wishlist.items
      ?.map((item) => item?.product_id)
      .filter((id): id is number => !!id)

    if (entityIds?.length) {
      const graphqlData = await getAllProducts({
        variables: { first: 100, entityIds },
        config,
      })
      // Put the products in an object that we can use to get them by id
      const productsById = graphqlData.products.reduce<{
        [k: number]: ProductEdge
      }>((prods, p) => {
        prods[p.node.entityId] = p
        return prods
      }, {})
      // Populate the wishlist items with the graphql products
      wishlist.items.forEach((item) => {
        const product = item && productsById[item.product_id!]
        if (item && product) {
          item.product = product.node
        }
      })
    }
  }

  return { wishlist: wishlist as RecursiveRequired<typeof wishlist> }
}

export default getCustomerWishlist
