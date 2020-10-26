import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import { BigcommerceConfig, getConfig } from '..'
import { definitions } from '../definitions/wishlist'

export type Wishlist = definitions['wishlist_Full']

export type GetCustomerWishlistResult<
  T extends { wishlist?: any } = { wishlist?: Wishlist }
> = T

export type GetCustomerWishlistVariables = {
  customerId: number
}

async function getCustomerWishlist(opts: {
  variables: GetCustomerWishlistVariables
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetCustomerWishlistResult>

async function getCustomerWishlist<
  T extends { wishlist?: any },
  V = any
>(opts: {
  url: string
  variables: V
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetCustomerWishlistResult<T>>

async function getCustomerWishlist({
  config,
  variables,
}: {
  url?: string
  variables: GetCustomerWishlistVariables
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetCustomerWishlistResult> {
  config = getConfig(config)

  const { data } = await config.storeApiFetch<
    RecursivePartial<{ data: Wishlist[] }>
  >(`/v3/wishlists?customer_id=${variables.customerId}`)
  const wishlists = (data as RecursiveRequired<typeof data>) ?? []
  const wishlist = wishlists[0]

  return { wishlist }
}

export default getCustomerWishlist
