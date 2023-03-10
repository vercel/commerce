import { MutationHook, MutationHookContext } from '@vercel/commerce/utils/types'
import useRemoveItem, {
  UseRemoveItem,
} from '@vercel/commerce/cart/use-remove-item'
import { getCartToken } from '../utils/token/cart-token'
import useCart from './use-cart'
import { RemoveItemHook } from '@vercel/commerce/types/cart'
import { useCallback } from 'react'
import { normalizeCart } from '../utils/normalize/normalize-cart'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/api/v2/shop/orders',
    method: 'DELETE',
  },
  fetcher: async ({ input: { itemId }, options, fetch }) => {
    await fetch({
      url: `${options.url}/${getCartToken()}/items/${itemId}`,
      method: options.method,
    })
    const syliusCart = await fetch({
      url: `${options.url}/${getCartToken()}`,
      method: 'GET',
    })
    return normalizeCart(syliusCart)
  },
  useHook:
    ({ fetch }: MutationHookContext<RemoveItemHook>) =>
    () => {
      const { mutate } = useCart()

      return useCallback(
        async function removeItem(input) {
          const data = await fetch({ input: { itemId: input.id } })
          await mutate(data, false)
          return data
        },
        [fetch, mutate]
      )
    },
}
