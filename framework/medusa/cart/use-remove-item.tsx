import {
  HookFetcherContext,
  MutationHook,
  MutationHookContext,
} from '@commerce/utils/types'
import useRemoveItem, { UseRemoveItem } from '@commerce/cart/use-remove-item'
import { MEDUSA_CART_ID_COOKIE } from '@framework/const'
import Cookies from 'js-cookie'
import { normalizeCart } from '@framework/utils/normalizers/normalize-cart'
import { CommerceError } from '@commerce/utils/errors'
import { RemoveItemHook } from '@commerce/types/cart'
import { useCallback } from 'react'
import useCart from './use-cart'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: 'carts',
    method: 'deleteItem',
  },
  async fetcher({
    input: { itemId },
    options,
    fetch,
  }: HookFetcherContext<RemoveItemHook>) {
    const cart_id = Cookies.get(MEDUSA_CART_ID_COOKIE)

    if (cart_id) {
      const data = await fetch({
        ...options,
        variables: { cart_id: cart_id, line_id: itemId },
      })

      return normalizeCart(data.cart)
    } else {
      throw new CommerceError({ message: 'No cart was found' })
    }
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
