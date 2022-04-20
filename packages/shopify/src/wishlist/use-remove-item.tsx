/* eslint-disable react-hooks/rules-of-hooks */
import { CommerceError } from '@vercel/commerce/utils/errors'
import type { RemoveItemHook } from '../types/wishlist'
import useCustomer from '../customer/use-customer'
import useWishlist from './use-wishlist'
import type { MutationHook } from '@vercel/commerce/utils/types'
import useRemoveItem, {
  UseRemoveItem,
} from '@vercel/commerce/wishlist/use-remove-item'
import { useCallback } from 'react'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<RemoveItemHook> = {
  fetchOptions: {
    url: '/api/wishlist',
    method: 'DELETE',
  },
  async fetcher({ input, options, fetch }) {
    const data = await fetch({ ...options, variables: input })

    return data
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { data: customer } = useCustomer()
      const { mutate } = useWishlist()

      return useCallback(
        async function removeItem(input) {
          if (!customer) {
            // A signed customer is required in order to have a wishlist
            throw new CommerceError({
              message: 'Signed customer not found',
            })
          }

          // TODO: add validations before doing the fetch

          const data = await fetch({
            input: { itemId: input.id, itemVariantId: input.itemVariantId },
          })
          await mutate()
          return data
        },
        [fetch, mutate, customer]
      )
    },
}
