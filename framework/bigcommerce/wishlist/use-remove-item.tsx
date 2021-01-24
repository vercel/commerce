import { useCallback } from 'react'
import { HookFetcher } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useWishlistRemoveItem from '@commerce/wishlist/use-remove-item'
import type { RemoveItemBody } from '../api/wishlist'
import useCustomer from '../use-customer'
import useWishlist, { UseWishlistOptions, Wishlist } from './use-wishlist'

const defaultOpts = {
  url: '/api/bigcommerce/wishlist',
  method: 'DELETE',
}

export type RemoveItemInput = {
  id: string | number
}

export const fetcher: HookFetcher<Wishlist | null, RemoveItemBody> = (
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
  const useRemoveItem = (opts?: UseWishlistOptions) => {
    const { data: customer } = useCustomer()
    const { revalidate } = useWishlist(opts)
    const fn = useWishlistRemoveItem<Wishlist | null, RemoveItemBody>(
      defaultOpts,
      customFetcher
    )

    return useCallback(
      async function removeItem(input: RemoveItemInput) {
        if (!customer) {
          // A signed customer is required in order to have a wishlist
          throw new CommerceError({
            message: 'Signed customer not found',
          })
        }

        const data = await fn({ itemId: String(input.id) })
        await revalidate()
        return data
      },
      [fn, revalidate, customer]
    )
  }

  useRemoveItem.extend = extendHook

  return useRemoveItem
}

export default extendHook(fetcher)
