import { useCallback } from 'react'
import { CommerceError } from '@commerce/utils/errors'
import useCart from './use-cart'
import useCartAddItem, {
  AddItemInput as UseAddItemInput,
} from '@commerce/cart/use-add-item'
import type { HookFetcher } from '@commerce/utils/types'
import type { Cart } from '@commerce/types'
import checkoutLineItemAddMutation from '../utils/mutations/checkout-line-item-add'
import getCheckoutId from '@framework/utils/get-checkout-id'
import { checkoutToCart } from './utils'

const defaultOpts = {
  query: checkoutLineItemAddMutation,
}

export type AddItemInput = UseAddItemInput<any>

export const fetcher: HookFetcher<Cart, any> = async (
  options,
  { checkoutId, item },
  fetch
) => {
  if (
    item.quantity &&
    (!Number.isInteger(item.quantity) || item.quantity! < 1)
  ) {
    throw new CommerceError({
      message: 'The item quantity has to be a valid integer greater than 0',
    })
  }

  const data = await fetch<any, any>({
    ...options,
    variables: {
      checkoutId,
      lineItems: [item],
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
          item: {
            variantId: input.variantId,
            quantity: input.quantity ?? 1,
          },
          checkoutId: getCheckoutId(cart?.id),
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
