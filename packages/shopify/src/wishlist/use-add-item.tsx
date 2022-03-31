/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react'
import { CommerceError } from '@vercel/commerce/utils/errors'
import useAddItem, { UseAddItem } from '@vercel/commerce/wishlist/use-add-item'
import type { AddItemHook } from '../types/wishlist'
import useCustomer from '../customer/use-customer'
import useWishlist from './use-wishlist'
import type { MutationHook } from '@vercel/commerce/utils/types'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    url: '/api/wishlist',
    method: 'POST',
  },
  async fetcher({ input: item, options, fetch }) {
    const data = await fetch({ ...options, variables: item })

    return data
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { data: customer } = useCustomer()
      const { mutate } = useWishlist()

      return useCallback(
        async function addItem(item) {
          if (!customer) {
            // A signed customer is required in order to have a wishlist
            throw new CommerceError({
              message: 'Signed customer not found',
            })
          }

          // TODO: add validations before doing the fetch

          const data = await fetch({ input: { item } })
          await mutate()
          return data
        },
        [fetch, mutate, customer]
      )
    },
}
