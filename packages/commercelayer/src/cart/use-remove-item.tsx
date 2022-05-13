import { MutationHook } from '@vercel/commerce/utils/types'
import useRemoveItem, {
  UseRemoveItem,
} from '@vercel/commerce/cart/use-remove-item'
import getCredentials, {
  getOrganizationSlug,
} from '../api/utils/getCredentials'
import CLSdk from '@commercelayer/sdk'
import useCart from './use-cart'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input: { id } }) {
    const credentials = getCredentials()
    const orderId = localStorage.getItem('CL_ORDER_ID')
    const organization = getOrganizationSlug(credentials.ENDPOINT).organization
    const sdk = CLSdk({
      accessToken: credentials.accessToken,
      organization,
    })
    if (orderId && id) {
      await sdk.line_items.delete(id)
      return {}
    }
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCart()
      return async function removeItem(input) {
        const data = await fetch({ input })
        await mutate()
        return data
      }
    },
}
