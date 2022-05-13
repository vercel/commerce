import { MutationHook } from '@vercel/commerce/utils/types'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/cart/use-update-item'
import useCart from '../cart/use-cart'
import getCredentials, {
  getOrganizationSlug,
} from '../api/utils/getCredentials'
import CLSdk from '@commercelayer/sdk'
import getContentData from '../api/utils/getContentData'

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input: { item, quantity } }) {
    const credentials = getCredentials()
    const organization = getOrganizationSlug(credentials.ENDPOINT).organization
    const sdk = CLSdk({
      accessToken: credentials.accessToken,
      organization,
    })
    const orderId = localStorage.getItem('CL_ORDER_ID')
    if (orderId && item.id) {
      const lineItem = await sdk.line_items.update({ id: item.id, quantity })
      const [product] = await getContentData(item.productId)
      const [image] = product.images
      return {
        id: lineItem.id,
        name: lineItem.name,
        productId: item.productId,
        variantId: item.variantId,
        quantity: lineItem.quantity,
        price: lineItem.unit_amount_float,
        variant: {
          id: lineItem.id,
          name: lineItem.name,
          sku: lineItem.sku_code,
          price: lineItem.unit_amount_float,
          image,
        },
      }
    }
  },
  useHook:
    ({ fetch }) =>
    ({ item }) => {
      const { mutate } = useCart()
      return async function updateItem(input) {
        const data = await fetch({ input: { item, ...input } })
        await mutate()
        return data
      }
    },
}
