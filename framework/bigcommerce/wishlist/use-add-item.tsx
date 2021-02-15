import { useCallback } from 'react'
import { HookFetcher } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useWishlistAddItem, {
  AddItemInput,
} from '@commerce/wishlist/use-add-item'
import { UseWishlistInput } from '@commerce/wishlist/use-wishlist'
import type { ItemBody, AddItemBody } from '../api/wishlist'
import useCustomer from '../customer/use-customer'
import useWishlist from './use-wishlist'
import type { BigcommerceProvider } from '..'

const defaultOpts = {
  url: '/api/bigcommerce/wishlist',
  method: 'POST',
}

// export type AddItemInput = ItemBody

export const fetcher: HookFetcher<any, AddItemBody> = (
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
  const useAddItem = (opts?: UseWishlistInput<BigcommerceProvider>) => {
    const { data: customer } = useCustomer()
    const { revalidate } = useWishlist(opts)
    const fn = useWishlistAddItem(defaultOpts, customFetcher)

    return useCallback(
      async function addItem(input: AddItemInput<any>) {
        if (!customer) {
          // A signed customer is required in order to have a wishlist
          throw new CommerceError({
            message: 'Signed customer not found',
          })
        }

        const data = await fn({ item: input })
        await revalidate()
        return data
      },
      [fn, revalidate, customer]
    )
  }

  useAddItem.extend = extendHook

  return useAddItem
}

export default extendHook(fetcher)
