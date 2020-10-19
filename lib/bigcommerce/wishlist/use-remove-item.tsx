import { useCallback } from 'react'
import { HookFetcher } from '@lib/commerce/utils/types'
import useAction from '@lib/commerce/utils/use-action'
import type { RemoveItemBody } from '../api/wishlist'
import useWishlist, { Wishlist } from './use-wishlist'

const defaultOpts = {
  url: '/api/bigcommerce/wishlists',
  method: 'DELETE',
}

export type RemoveItemInput = {
  id: string
}

export const fetcher: HookFetcher<Wishlist | null, RemoveItemBody> = (
  options,
  { wishlistId, itemId },
  fetch
) => {
  return fetch({
    url: options?.url ?? defaultOpts.url,
    method: options?.method ?? defaultOpts.method,
    body: { wishlistId, itemId },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useRemoveItem = (wishlistId: string, item?: any) => {
    const { mutate } = useWishlist(wishlistId)
    const fn = useAction<Wishlist | null, RemoveItemBody>(
      defaultOpts,
      customFetcher
    )

    return useCallback(
      async function removeItem(input: RemoveItemInput) {
        const data = await fn({ wishlistId, itemId: input.id ?? item?.id })
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
