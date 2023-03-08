import type { AddItemHook } from '@vercel/commerce/types/cart'
import type { MutationHook } from '@vercel/commerce/utils/types'

import { CommerceError } from '@vercel/commerce/utils/errors'
import useAddItem, { type UseAddItem } from '@vercel/commerce/cart/use-add-item'
import useCart from './use-cart'
import { checkoutToCart } from './utils'
import { getCheckoutId } from '../utils'
import { useCallback } from 'react'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: 'cart',
    method: 'addItem',
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
    const variables: {
      product_id: string | undefined
      variant_id?: string
      checkoutId?: string
      quantity?: number
    } = {
      checkoutId: getCheckoutId(),
      product_id: item.productId,
      quantity: item.quantity,
    }
    if (item.productId !== item.variantId) {
      variables.variant_id = item.variantId
    }

    const response = await fetch({
      ...options,
      variables,
    })

    return checkoutToCart(response) as any
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
