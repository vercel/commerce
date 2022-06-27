import { useCallback } from 'react'
import type { MutationHook } from '@vercel/commerce/utils/types'
import useAddItem, { UseAddItem } from '@vercel/commerce/wishlist/use-add-item'
import type { AddItemHook } from '../types/wishlist'
import useWishlist from './use-wishlist'
import useCustomer from '@vercel/commerce/customer/use-customer'
import { CommerceError } from '@vercel/commerce/utils/errors'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    url: '/api/wishlist',
    method: 'POST',
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { data: customer } = useCustomer()
      const { mutate } = useWishlist()

      return useCallback(
        async function addItem(input) {
          if (!customer) {
            throw new CommerceError({
              message: 'Signed customer not found',
            })
          }
          const data = await fetch({ input: { item: input } })
          await mutate(data, false)
          return data
        },
        [fetch, mutate, customer]
      )
    },
}
