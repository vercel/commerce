import { AquilacmsConfig, getConfig } from '../api'

export type Wishlist = Omit<any, 'items'> & {
  items?: WishlistItem[]
}

export type WishlistItem = NonNullable<any>[0] & {
  product?: any
}

export type GetCustomerWishlistResult<
  T extends { wishlist?: any } = { wishlist?: Wishlist }
> = T

export type GetCustomerWishlistVariables = {
  customerId: number
}

async function getCustomerWishlist(opts: {
  variables: GetCustomerWishlistVariables
  config?: AquilacmsConfig
  includeProducts?: boolean
}): Promise<GetCustomerWishlistResult>

async function getCustomerWishlist<
  T extends { wishlist?: any },
  V = any
>(opts: {
  url: string
  variables: V
  config?: AquilacmsConfig
  includeProducts?: boolean
}): Promise<GetCustomerWishlistResult<T>>

async function getCustomerWishlist({
  config,
  variables,
  includeProducts,
}: {
  url?: string
  variables: GetCustomerWishlistVariables
  config?: AquilacmsConfig
  includeProducts?: boolean
}): Promise<GetCustomerWishlistResult> {
  config = getConfig(config)

  return { wishlist: [] }
}

export default getCustomerWishlist
