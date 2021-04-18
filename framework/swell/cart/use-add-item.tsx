import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import useCart from './use-cart'
import { Cart, CartItemBody } from '../types'
import { checkoutToCart } from './utils'
import { Mutation, MutationCheckoutLineItemsAddArgs } from '../schema'
import { useCallback } from 'react'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<Cart, {}, CartItemBody> = {
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
    const response = await fetch<Mutation, MutationCheckoutLineItemsAddArgs>({
      ...options,
      variables: {
        product_id: item.productId,
        quantity: item.quantity,
      },
    })

    // TODO: Fix this Cart type here
    return checkoutToCart(response) as any
  },
  useHook: ({ fetch }) => () => {
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
