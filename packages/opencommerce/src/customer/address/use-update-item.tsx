import Cookies from 'js-cookie'
import type { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/customer/address/use-update-item'
import { useCheckoutContext } from '@components/checkout/context'
import selectFulfillmentOptions from '../../api/mutations/select-fulfillment-options'

import { useCheckout } from '../../checkout'
import { UpdateAddressItemHook } from '../../types/customer/address'
import { OPENCOMMERCE_ANONYMOUS_CART_TOKEN_COOKIE } from '../../const'

export default useUpdateItem as UseUpdateItem<typeof handler>

export const handler: MutationHook<UpdateAddressItemHook> = {
  fetchOptions: {
    query: selectFulfillmentOptions,
  },
  async fetcher({ input: { item, itemId: cartId }, options, fetch }) {
    const cartToken = Cookies.get(OPENCOMMERCE_ANONYMOUS_CART_TOKEN_COOKIE)

    if (!cartId) return null

    const data = await fetch({
      ...options,
      variables: {
        input: {
          cartId,
          cartToken,
          fulfillmentGroupId: item.fulfillmentGroupId,
          fulfillmentMethodId: item.shippingMethodId,
        },
      },
    })

    return data
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { data: checkoutData } = useCheckout()

      const { setAddressFields, addressFields } = useCheckoutContext()
      return useCallback(
        async function updateItem(input) {
          const { id, ...rest } = input
          const fulfillmentGroupId =
            checkoutData?.shippingGroup?._id || 'groupId'
          await fetch({
            input: { item: { ...rest, fulfillmentGroupId }, itemId: id },
          })
          setAddressFields({
            ...addressFields,
            shippingMethodId: rest.shippingMethodId,
            fulfillmentGroupId,
          })
          return null
        },
        [setAddressFields]
      )
    },
}
