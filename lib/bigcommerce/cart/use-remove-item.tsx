import { useCallback } from 'react'
import { HookFetcher } from '@lib/commerce/utils/types'
import { default as useCartRemoveItem } from '@lib/commerce/cart/use-remove-item'
import type { RemoveItemBody } from '../api/cart'
import { Cart, useCart } from '.'

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
    url: options.url!,
    method: options.method!,
    body: { itemId },
  })
}

function extend(customFetcher: typeof fetcher) {
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

  useRemoveItem.extend = extend

  return useRemoveItem
}

export default extend(fetcher)
