import { ShopifyConfig, Provider } from './../index'
import { getCustomerAdminQuery } from '../../utils/queries'
import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type {
  GetCustomerWishlistOperation,
  Wishlist,
} from '../../types/wishlist'
import { Product } from '../../types/product'

export default function getCustomerWishlistOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getCustomerWishlist<
    T extends GetCustomerWishlistOperation
  >(opts: {
    variables: T['variables']
    config?: ShopifyConfig
    includeProducts?: boolean
  }): Promise<T['data']>

  async function getCustomerWishlist<T extends GetCustomerWishlistOperation>(
    opts: {
      variables: T['variables']
      config?: ShopifyConfig
      includeProducts?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getCustomerWishlist<T extends GetCustomerWishlistOperation>({
    query = getCustomerAdminQuery,
    config,
    variables,
    includeProducts,
  }: {
    query?: string
    variables: T['variables']
    config?: ShopifyConfig
    includeProducts?: boolean
  }): Promise<T['data']> {
    const { fetch } = commerce.getConfig(config)
    const { data } = await fetch(
      query,
      {
        variables: {
          id: variables.customerId,
        },
      },
      undefined,
      true
    )

    if (!data.customer.metafield) {
      return data
    }

    const tempWishlist =
      data.customer.metafield && JSON.parse(data.customer?.metafield?.value!)

    const wishlist: Wishlist = {
      id: String(data.customer?.metafield?.id!),
      items: tempWishlist,
    }

    const { products } = await commerce.getAllProducts({
      variables: { first: 250 },
      config,
    })

    const wishlistItems = products.filter((item: Product) =>
      wishlist.items?.find(({ productId }) => item.id === productId)
    )

    wishlist.items?.forEach((item) => {
      const product =
        item &&
        wishlistItems.find((wishlistItem) => wishlistItem.id === item.productId)

      if (item && product) {
        item.product = product as any
      }
    })

    return {
      wishlist,
    }
  }

  return getCustomerWishlist
}
