import { useCallback } from 'react'
import { HookFetcher } from '@commerce/utils/types'
import useCartRemoveItem from '@commerce/cart/use-remove-item'
import type { RemoveItemBody } from '../api/cart'
import useCart, { Cart } from './use-cart'

const defaultOpts = {
  url: '/api/bigcommerce/cart',
  method: 'DELETE',
}

export type RemoveItemInput = {
  id: string
}

export const fetcher: HookFetcher<Cart | null, RemoveItemBody> = (
  options,
  { itemId },
  fetch
) => {
  return fetch({
    ...defaultOpts,
    ...options,
    body: { itemId },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useRemoveItem = (item?: any) => {
    const { mutate } = useCart()
    const fn = useCartRemoveItem<Cart | null, RemoveItemBody>(
      defaultOpts,
      customFetcher
    )

    return useCallback(
      async function removeItem(input: RemoveItemInput) {
        const data = await fn({ itemId: input.id ?? item?.id })
        await mutate(data, false)
        return data
      },
      [fn, mutate]
    )
  }

  useRemoveItem.extend = extendHook

  return useRemoveItem
}

export default extendHook(fetcher)
