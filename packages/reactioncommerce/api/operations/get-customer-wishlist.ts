import { OperationContext } from '@commerce/api/operations'
import { Provider, VendureConfig } from '../'

export default function getCustomerWishlistOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getCustomerWishlist({
    config: cfg,
    variables,
    includeProducts,
  }: {
    url?: string
    variables: any
    config?: Partial<VendureConfig>
    includeProducts?: boolean
  }): Promise<any> {
    // Not implemented as Vendure does not ship with wishlist functionality at present
    const config = commerce.getConfig(cfg)
    return { wishlist: {} }
  }

  return getCustomerWishlist
}
