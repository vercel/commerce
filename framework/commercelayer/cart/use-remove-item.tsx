import { MutationHook } from '@commerce/utils/types'
import useRemoveItem, { UseRemoveItem } from '@commerce/cart/use-remove-item'
import getCredentials from '@framework/api/utils/getCredentials'
import { LineItem } from '@commercelayer/js-sdk'
import useCart from '@framework/cart/use-cart'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input: { id } }) {
    const credentials = getCredentials()
    const orderId = localStorage.getItem('CL_ORDER')
    if (orderId && id) {
      await LineItem.build({ id }).withCredentials(credentials).destroy()
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
