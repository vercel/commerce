import { useCallback } from 'react'
import { HookFetcher } from '@commerce/utils/types'
import { ValidationError } from '@commerce/utils/errors'
import useCartRemoveItem, {
  RemoveItemInput as UseRemoveItemInput,
} from '@commerce/cart/use-remove-item'
import { normalizeCart } from '../lib/normalize'
import type {
  RemoveCartItemBody,
  Cart,
  BigcommerceCart,
  LineItem,
} from '../types'
import useCart from './use-cart'

const defaultOpts = {
  url: '/api/bigcommerce/cart',
  method: 'DELETE',
}

export type RemoveItemFn<T = any> = T extends LineItem
  ? (input?: RemoveItemInput<T>) => Promise<Cart | null>
  : (input: RemoveItemInput<T>) => Promise<Cart | null>

export type RemoveItemInput<T = any> = T extends LineItem
  ? Partial<UseRemoveItemInput>
  : UseRemoveItemInput

export const fetcher: HookFetcher<Cart | null, RemoveCartItemBody> = async (
  options,
  { itemId },
  fetch
) => {
  const data = await fetch<BigcommerceCart>({
    ...defaultOpts,
    ...options,
    body: { itemId },
  })
  return normalizeCart(data)
}

export function extendHook(customFetcher: typeof fetcher) {
  const useRemoveItem = <T extends LineItem | undefined = undefined>(
    item?: T
  ) => {
    const { mutate } = useCart()
    const fn = useCartRemoveItem<Cart | null, RemoveCartItemBody>(
      defaultOpts,
      customFetcher
    )
    const removeItem: RemoveItemFn<LineItem> = async (input) => {
      const itemId = input?.id ?? item?.id

      if (!itemId) {
        throw new ValidationError({
          message: 'Invalid input used for this operation',
        })
      }

      const data = await fn({ itemId })
      await mutate(data, false)
      return data
    }

    return useCallback(removeItem as RemoveItemFn<T>, [fn, mutate])
  }

  useRemoveItem.extend = extendHook

  return useRemoveItem
}

export default extendHook(fetcher)
