import { useCallback } from 'react'
import { HookFetcher } from '@commerce/utils/types'
import { ValidationError } from '@commerce/utils/errors'
import useCartRemoveItem, {
  RemoveItemInput as UseRemoveItemInput,
} from '@commerce/cart/use-remove-item'

import useCart from './use-cart'

import type { Cart, LineItem, RemoveCartItemBody } from '@commerce/types'
import { checkoutLineItemRemoveMutation } from '@framework/utils/mutations'
import getCheckoutId from '@framework/utils/get-checkout-id'
import { checkoutToCart } from './utils'

const defaultOpts = {
  query: checkoutLineItemRemoveMutation,
}

export type RemoveItemFn<T = any> = T extends LineItem
  ? (input?: RemoveItemInput<T>) => Promise<Cart | null>
  : (input: RemoveItemInput<T>) => Promise<Cart | null>

export type RemoveItemInput<T = any> = T extends LineItem
  ? Partial<UseRemoveItemInput>
  : UseRemoveItemInput

export const fetcher: HookFetcher<Cart | null, any> = async (
  options,
  { itemId, checkoutId },
  fetch
) => {
  const data = await fetch<any>({
    ...defaultOpts,
    ...options,
    variables: { lineItemIds: [itemId], checkoutId },
  })
  return checkoutToCart(data?.checkoutLineItemsRemove)
}

export function extendHook(customFetcher: typeof fetcher) {
  const useRemoveItem = <T extends LineItem | undefined = undefined>(
    item?: T
  ) => {
    const { mutate, data: cart } = useCart()
    const fn = useCartRemoveItem<Cart | null, any>(defaultOpts, customFetcher)
    const removeItem: RemoveItemFn<LineItem> = async (input) => {
      const itemId = input?.id ?? item?.id

      if (!itemId) {
        throw new ValidationError({
          message: 'Invalid input used for this operation',
        })
      }

      const data = await fn({
        checkoutId: getCheckoutId(cart?.id),
        itemId,
      })

      await mutate(data, false)
      return data
    }

    return useCallback(removeItem as RemoveItemFn<T>, [fn, mutate])
  }

  useRemoveItem.extend = extendHook

  return useRemoveItem
}

export default extendHook(fetcher)
