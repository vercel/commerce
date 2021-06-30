import { OperationContext } from '@commerce/api/operations'
import { Provider, CommercetoolsConfig } from '@framework/api'

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
    config?: Partial<CommercetoolsConfig>
    includeProducts?: boolean
  }): Promise<any> {
    // Not implemented yet
    const config = commerce.getConfig(cfg)
    return { wishlist: {} }
  }

  return getCustomerWishlist
}
