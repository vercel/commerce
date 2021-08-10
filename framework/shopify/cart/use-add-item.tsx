import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import type { AddItemHook } from '../types/cart'
import useCart from './use-cart'
import {
  getCartId,
  normalizeCart,
  throwUserErrors,
  cartLineItemAddMutation,
  cartCreate,
} from '../utils'
import { CartLinesAddMutation, CartLinesAddMutationVariables } from '../schema'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: cartLineItemAddMutation,
  },
  async fetcher({ input: item, options, fetch }) {
    if (
      item.quantity &&
      (!Number.isInteger(item.quantity) || item.quantity! < 1)
    ) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      })
    }

    const lines = [
      {
        merchandiseId: item.variantId,
        quantity: item.quantity ?? 1,
      },
    ]

    let cartId = getCartId()

    if (!cartId) {
      const cart = await cartCreate(fetch, lines)
      return normalizeCart(cart)
    } else {
      const { cartLinesAdd } = await fetch<
        CartLinesAddMutation,
        CartLinesAddMutationVariables
      >({
        ...options,
        variables: {
          cartId,
          lines,
        },
      })

      throwUserErrors(cartLinesAdd?.userErrors)

      return normalizeCart(cartLinesAdd?.cart)
    }
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
