import { useCallback } from 'react'
import useCart from './use-cart'

import useCartAddItem, {
  AddItemInput as UseAddItemInput,
} from '@commerce/cart/use-add-item'

import type { HookFetcher } from '@commerce/utils/types'
import type { Cart } from '@commerce/types'

import { checkoutLineItemAddMutation, getCheckoutId } from '@framework/utils'
import { checkoutToCart } from './utils'

import { AddCartItemBody, CartItemBody } from '@framework/types'
import { MutationCheckoutLineItemsAddArgs } from '@framework/schema'

const defaultOpts = {
  query: checkoutLineItemAddMutation,
}

export type AddItemInput = UseAddItemInput<CartItemBody>

export const fetcher: HookFetcher<
  Cart,
  MutationCheckoutLineItemsAddArgs
> = async (options, { checkoutId, lineItems }, fetch) => {
  const data = await fetch<any, AddCartItemBody>({
    ...options,
    variables: {
      checkoutId,
      lineItems,
    },
  })

  return checkoutToCart(data?.checkoutLineItemsAdd)
}

export function extendHook(customFetcher: typeof fetcher) {
  const useAddItem = () => {
    const { mutate, data: cart } = useCart()
    const fn = useCartAddItem(defaultOpts, customFetcher)

    return useCallback(
      async function addItem(input: AddItemInput) {
        const data = await fn({
          lineItems: [
            {
              variantId: input.variantId,
              quantity: input.quantity ?? 1,
            },
          ],
          checkoutId: getCheckoutId(cart?.id)!,
        })
        await mutate(data, false)
        return data
      },
      [fn, mutate]
    )
  }

  useAddItem.extend = extendHook

  return useAddItem
}

export default extendHook(fetcher)
