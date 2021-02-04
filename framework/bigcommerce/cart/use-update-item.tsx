import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import type { HookFetcher } from '@commerce/utils/types'
import { ValidationError } from '@commerce/utils/errors'
import useCartUpdateItem, {
  UpdateItemInput as UseUpdateItemInput,
} from '@commerce/cart/use-update-item'
import { normalizeCart } from '../lib/normalize'
import type {
  UpdateCartItemBody,
  Cart,
  BigcommerceCart,
  LineItem,
} from '../types'
import { fetcher as removeFetcher } from './use-remove-item'
import useCart from './use-cart'

const defaultOpts = {
  url: '/api/bigcommerce/cart',
  method: 'PUT',
}

export type UpdateItemInput<T = any> = T extends LineItem
  ? Partial<UseUpdateItemInput<LineItem>>
  : UseUpdateItemInput<LineItem>

export const fetcher: HookFetcher<Cart | null, UpdateCartItemBody> = async (
  options,
  { itemId, item },
  fetch
) => {
  if (Number.isInteger(item.quantity)) {
    // Also allow the update hook to remove an item if the quantity is lower than 1
    if (item.quantity! < 1) {
      return removeFetcher(null, { itemId }, fetch)
    }
  } else if (item.quantity) {
    throw new ValidationError({
      message: 'The item quantity has to be a valid integer',
    })
  }

  const data = await fetch<BigcommerceCart, UpdateCartItemBody>({
    ...defaultOpts,
    ...options,
    body: { itemId, item },
  })

  return normalizeCart(data)
}

function extendHook(customFetcher: typeof fetcher, cfg?: { wait?: number }) {
  const useUpdateItem = <T extends LineItem | undefined = undefined>(
    item?: T
  ) => {
    const { mutate } = useCart()
    const fn = useCartUpdateItem<Cart | null, UpdateCartItemBody>(
      defaultOpts,
      customFetcher
    )

    return useCallback(
      debounce(async (input: UpdateItemInput<T>) => {
        const itemId = input.id ?? item?.id
        const productId = input.productId ?? item?.productId
        const variantId = input.productId ?? item?.variantId

        if (!itemId || !productId || !variantId) {
          throw new ValidationError({
            message: 'Invalid input used for this operation',
          })
        }

        const data = await fn({
          itemId,
          item: { productId, variantId, quantity: input.quantity },
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
