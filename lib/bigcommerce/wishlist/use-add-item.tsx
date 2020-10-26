import { useCallback } from 'react'
import { HookFetcher } from '@lib/commerce/utils/types'
import { CommerceError } from '@lib/commerce/utils/errors'
import useWishlistAddItem from '@lib/commerce/wishlist/use-add-item'
import type { ItemBody, AddItemBody } from '../api/wishlist'
import useCustomer from '../use-customer'
import useWishlist, { Wishlist } from './use-wishlist'

const defaultOpts = {
  url: '/api/bigcommerce/wishlist',
  method: 'POST',
}

export type AddItemInput = ItemBody

export const fetcher: HookFetcher<Wishlist, AddItemBody> = (
  options,
  { item },
  fetch
) => {
  // TODO: add validations before doing the fetch
  return fetch({
    ...defaultOpts,
    ...options,
    body: { item },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useAddItem = () => {
    const { data: customer } = useCustomer()
    const { mutate } = useWishlist()
    const fn = useWishlistAddItem(defaultOpts, customFetcher)

    return useCallback(
      async function addItem(input: AddItemInput) {
        if (!customer) {
          // A signed customer is required in order to have a wishlist
          throw new CommerceError({
            message: 'Signed customer not found',
          })
        }

        const data = await fn({ item: input })
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
