import { useCallback } from 'react'
import { HookFetcher } from '@lib/commerce/utils/types'
import useAction from '@lib/commerce/utils/use-action'
import type { ItemBody, AddItemBody } from '../api/wishlist'
import useWishlist, { Wishlist } from './use-wishlist'

const defaultOpts = {
  url: '/api/bigcommerce/wishlist',
  method: 'POST',
}

export type AddItemInput = ItemBody

export const fetcher: HookFetcher<Wishlist, AddItemBody> = (
  options,
  { wishlistId, item },
  fetch
) => {
  return fetch({
    url: options?.url ?? defaultOpts.url,
    method: options?.method ?? defaultOpts.method,
    body: { wishlistId, item },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useAddItem = (wishlistId: string) => {
    const { mutate } = useWishlist(wishlistId)
    const fn = useAction<Wishlist, AddItemBody>(defaultOpts, customFetcher)

    return useCallback(
      async function addItem(input: AddItemInput) {
        const data = await fn({ wishlistId, item: input })
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
