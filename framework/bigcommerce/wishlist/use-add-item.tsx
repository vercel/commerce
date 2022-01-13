import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useAddItem, { UseAddItem } from '@commerce/wishlist/use-add-item'
import type { AddItemHook } from '../types/wishlist'
import useCustomer from '../customer/use-customer'
import useWishlist from './use-wishlist'

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
