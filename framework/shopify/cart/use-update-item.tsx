import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import type { HookFetcher } from '@commerce/utils/types'
import { ValidationError } from '@commerce/utils/errors'
import useCartUpdateItem, {
  UpdateItemInput as UseUpdateItemInput,
} from '@commerce/cart/use-update-item'

import { fetcher as removeFetcher } from './use-remove-item'

import useCart from './use-cart'

import type { Cart, LineItem, UpdateCartItemBody } from '@commerce/types'
import { checkoutToCart } from './utils'
import checkoutLineItemUpdateMutation from '@framework/utils/mutations/checkout-line-item-update'
import getCheckoutId from '@framework/utils/get-checkout-id'

const defaultOpts = {
  query: checkoutLineItemUpdateMutation,
}

export type UpdateItemInput<T = any> = T extends LineItem
  ? Partial<UseUpdateItemInput<LineItem>>
  : UseUpdateItemInput<LineItem>

export const fetcher: HookFetcher<Cart | null, any> = async (
  options,
  { item, checkoutId },
  fetch
) => {
  if (Number.isInteger(item.quantity)) {
    // Also allow the update hook to remove an item if the quantity is lower than 1
    if (item.quantity! < 1) {
      return removeFetcher(null, { itemId: item.id, checkoutId }, fetch)
    }
  } else if (item.quantity) {
    throw new ValidationError({
      message: 'The item quantity has to be a valid integer',
    })
  }
  const data = await fetch<any, any>({
    ...defaultOpts,
    ...options,
    variables: { checkoutId, lineItems: [item] },
  })

  return checkoutToCart(data?.checkoutLineItemsUpdate)
}

function extendHook(customFetcher: typeof fetcher, cfg?: { wait?: number }) {
  const useUpdateItem = <T extends LineItem | undefined = undefined>(
    item?: T
  ) => {
    const { mutate, data: cart } = useCart()
    const fn = useCartUpdateItem<Cart | null, any>(defaultOpts, customFetcher)

    return useCallback(
      debounce(async (input: UpdateItemInput<T>) => {
        const itemId = input.id ?? item?.id
        const variantId = input.productId ?? item?.variantId

        if (!itemId || !variantId) {
          throw new ValidationError({
            message: 'Invalid input used for this operation',
          })
        }

        const data = await fn({
          item: { id: itemId, variantId, quantity: input.quantity },
          checkoutId: getCheckoutId(cart?.id),
        })

        await mutate(data, false)
        return data
      }, cfg?.wait ?? 500),
      [fn, mutate]
    )
  }

  useUpdateItem.extend = extendHook

  return useUpdateItem
}

export default extendHook(fetcher)
