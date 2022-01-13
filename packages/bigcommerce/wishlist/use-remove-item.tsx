import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useRemoveItem, {
  UseRemoveItem,
} from '@commerce/wishlist/use-remove-item'
import type { RemoveItemHook } from '../types/wishlist'
import useCustomer from '../customer/use-customer'
import useWishlist from './use-wishlist'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<RemoveItemHook> = {
  fetchOptions: {
    url: '/api/wishlist',
    method: 'DELETE',
  },
  useHook:
    ({ fetch }) =>
    ({ wishlist } = {}) => {
      const { data: customer } = useCustomer()
      const { revalidate } = useWishlist(wishlist)

      return useCallback(
        async function removeItem(input) {
          if (!customer) {
            // A signed customer is required in order to have a wishlist
            throw new CommerceError({
              message: 'Signed customer not found',
            })
          }

          const data = await fetch({ input: { itemId: String(input.id) } })
          await revalidate()
          return data
        },
        [fetch, revalidate, customer]
      )
    },
}
