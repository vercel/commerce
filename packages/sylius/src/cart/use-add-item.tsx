import useAddItem, { UseAddItem } from '@vercel/commerce/cart/use-add-item'
import { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import { getCartToken, setCartToken } from '../utils/token/cart-token'
import useCart from './use-cart'

export default useAddItem as UseAddItem<typeof handler>
export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/api/v2/shop/orders',
    method: 'POST',
  },
  fetcher: async ({ input: { productId, variantId }, options, fetch }) => {
    if (!getCartToken()) {
      const syliusOrder = await fetch({
        url: options.url,
        method: 'POST',
        body: {
          localeCode: 'fr_FR',
        },
      })
      setCartToken(syliusOrder.tokenValue)
    }
    await fetch({
      url: `${options.url}/${getCartToken()}/items`,
      method: options.method,
      body: {
        productVariant: variantId,
        quantity: 1,
      },
    })
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCart()

      return useCallback(
        async function addItem(input) {
          const data = await fetch({ input })
          await mutate(data, false)
          return data
        },
        [fetch, mutate]
      )
    },
}
