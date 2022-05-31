import type { UpdateItemHook } from '@vercel/commerce/types/customer/address'
import type { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/customer/address/use-update-item'
import { useCheckoutContext } from '@components/checkout/context'
import { CustomerAddressTypes } from '../../types/customer/address'
import { useCart } from '../../cart'

export default useUpdateItem as UseUpdateItem<typeof handler>

export const handler: MutationHook<UpdateItemHook<CustomerAddressTypes>> = {
  fetchOptions: {
    url: '/api/customer/address',
    method: 'PUT',
  },
  async fetcher({ input: { item, itemId }, options, fetch }) {
    const data = await fetch({
      ...options,
      body: { item, itemId },
    })

    return data
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { data: cart } = useCart()

      const { setAddressFields, addressFields } = useCheckoutContext()
      return useCallback(
        async function updateItem(input) {
          const { id, ...rest } = input
          const fulfillmentGroupId =
            cart?.checkout?.fulfillmentGroups[0]._id || 'groupId'
          await fetch({
            input: { item: { ...rest, fulfillmentGroupId }, itemId: id },
          })
          setAddressFields({
            ...addressFields,
            shippingMethodId: rest.shippingMethodId,
            fulfillmentGroupId,
          })
          return undefined
        },
        [setAddressFields]
      )
    },
}
