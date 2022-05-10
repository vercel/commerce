import useAddItem, { UseAddItem } from '@vercel/commerce/wishlist/use-add-item'
import useCustomer from '../customer/use-customer'
import { useCallback } from 'react'
import { MutationHook } from '@vercel/commerce/utils/types'
import useWishlist from './use-wishlist'
import { CommerceError } from '@vercel/commerce/utils/errors'
export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input }) {
    const { variantId } = input
    let wishlist = []
    const localWishlist = localStorage.getItem('wishlist')
    if (localWishlist) {
      wishlist = JSON.parse(localWishlist)
      if (!wishlist.includes(variantId)) {
        wishlist.push(variantId)
      }
    } else {
      wishlist.push(variantId)
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    return wishlist
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useWishlist()
      const { data: customer } = useCustomer()
      return useCallback(
        async function addItem(input) {
          if (!customer) {
            // A signed customer is required in order to have a wishlist
            throw new CommerceError({
              message: 'Signed customer not found',
            })
          }
          const data = await fetch({ input })
          await mutate()
          return data
        },
        [fetch]
      )
    },
}
