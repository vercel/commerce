import useAddItem, { UseAddItem } from '@vercel/commerce/cart/use-add-item'
import { CommerceError } from '@vercel/commerce/utils/errors'
import type { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import useCart from './use-cart'
import { AddItemToOrderMutation } from '../../schema'
import { normalizeCart } from '../utils/normalize'
import { addItemToOrderMutation } from '../utils/mutations/add-item-to-order-mutation'
import type { AddItemHook } from '@vercel/commerce/types/cart'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: addItemToOrderMutation,
  },
  async fetcher({ input, options, fetch }) {
    if (
      input.quantity &&
      (!Number.isInteger(input.quantity) || input.quantity! < 1)
    ) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      })
    }

    const { addItemToOrder } = await fetch<AddItemToOrderMutation>({
      ...options,
      variables: {
        quantity: input.quantity || 1,
        variantId: input.variantId,
      },
    })

    if (addItemToOrder.__typename === 'Order') {
      return normalizeCart(addItemToOrder)
    }
    throw new CommerceError(addItemToOrder)
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
