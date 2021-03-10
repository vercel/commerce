import { getConfig, VendureConfig } from '../api'

async function getCustomerWishlist({
  config,
  variables,
  includeProducts,
}: {
  url?: string
  variables: any
  config?: VendureConfig
  includeProducts?: boolean
}): Promise<any> {
  // Not implemented as Vendure does not ship with wishlist functionality at present
  config = getConfig(config)
  return { wishlist: {} }
}

export default getCustomerWishlist
